import axios, { AxiosError, Method } from 'axios';
import ApiError from 'errors/api';
import { apiRequestFormatter } from 'formatters/apiRequest';
import { store } from 'store';

import { API_ENDPOINT } from '../settings';
import { apiResponseFormatter } from './../formatters/apiResponse';
import mock from './_mock';

export class ApiService {
  public get<T = any>(url: string, params?: any): Promise<T> {
    return this.request<T>('GET', url, params);
  }

  public post<T = any>(url: string, body: any): Promise<T> {
    return this.request<T>('POST', url, body);
  }

  public put<T = any>(url: string, body: any): Promise<T> {
    return this.request<T>('PUT', url, body);
  }

  public delete<T = any>(url: string, params?: any): Promise<T> {
    return this.request<T>('DELETE', url, params);
  }

  public upload<T = any>(url: string, data: FormData, onProgress: (progress: number) => void): Promise<T> {
    return this.request<T>('POST', url, data, onProgress);
  }

  private async request<T = any>(
    method: Method,
    url: string,
    data?: any,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    try {
      onProgress && onProgress(0);

      const response = API_ENDPOINT
        ? await axios.request({
            baseURL: API_ENDPOINT,
            url,
            method,
            headers: {
              Authorization: await store.getState().authToken.value,
              'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
            },
            params: method === 'GET' ? apiRequestFormatter(data) : null,
            data: method === 'POST' || method === 'PUT' ? apiRequestFormatter(data) : null,
            onUploadProgress: (progress: ProgressEvent) => {
              onProgress && onProgress((progress.loaded / progress.total) * 100);
            }
          })
        : { data: mock[method][url] };

      onProgress && onProgress(100);
      return apiResponseFormatter<T>(response.data || {});
    } catch (err) {
      return this.handleError<T>(err);
    }
  }

  private async handleError<T>(err: AxiosError): Promise<T> {
    if (!err.config || !err.response) throw err;
    throw new ApiError(err.config, err.response, err);
  }
}

const apiService = new ApiService();
export default apiService;

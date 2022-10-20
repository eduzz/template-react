import axios, { AxiosError, AxiosProgressEvent, AxiosResponse, Method } from 'axios';

import { API_ENDPOINT } from '@/settings';
import { store } from '@/store';

export class ApiServiceClass {
  public get<T = unknown>(url: string, params?: unknown): Promise<AxiosResponse<T>> {
    return this.request<T>('GET', url, params);
  }

  public post<T = unknown>(url: string, body: unknown): Promise<AxiosResponse<T>> {
    return this.request<T>('POST', url, body);
  }

  public put<T = unknown>(url: string, body: unknown): Promise<AxiosResponse<T>> {
    return this.request<T>('PUT', url, body);
  }

  public delete<T = unknown>(url: string, params?: unknown): Promise<AxiosResponse<T>> {
    return this.request<T>('DELETE', url, params);
  }

  public upload<T = unknown>(options: {
    url: string;
    data: FormData;
    onProgress: (progress: number) => void;
  }): Promise<AxiosResponse<T>> {
    return this.request<T>('POST', options.url, options.data, options.onProgress);
  }

  private async request<T = unknown>(
    method: Method,
    url: string,
    data: any,
    onProgress?: (progress: number) => void
  ): Promise<AxiosResponse<T>> {
    try {
      onProgress && onProgress(0);
      const authToken = store.getState().authToken.value;

      const request = await axios.request({
        baseURL: API_ENDPOINT,
        url,
        method,
        headers: {
          'Authorization': authToken ? `Bearer ${authToken}` : '',
          'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
        },
        params: method === 'GET' ? data : null,
        data: method === 'POST' || method === 'PUT' ? data : null,
        onUploadProgress: (progress: AxiosProgressEvent) => {
          onProgress && onProgress((progress.loaded / (progress?.total ?? 0)) * 100);
        }
      });

      onProgress && onProgress(100);

      return request.data || {};
    } catch (err) {
      const error = err as AxiosError | Error;
      return this.handleError(error);
    }
  }

  private async handleError<T>(error: AxiosError | Error): Promise<T> {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error(error.message);
    }
  }
}

const ApiService = new ApiServiceClass();

export default ApiService;

import axios, { AxiosError, Method } from 'axios';
import ApiError from 'errors/api';
import { apiRequestFormatter } from 'formatters/apiRequest';

import { API_ENDPOINT } from '../settings';
import { apiResponseFormatter } from './../formatters/apiResponse';
import tokenService, { TokenService } from './token';

export class ApiService {
  constructor(private apiEndpoint: string, private tokenService: TokenService) {}

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
    onProgress?: (progress: number) => void,
    retry?: boolean
  ): Promise<T> {
    try {
      const token = await this.tokenService.getToken().toPromise();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.request({
        baseURL: this.apiEndpoint,
        url,
        method,
        headers: {
          ...headers,
          'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
        },
        params: method === 'GET' ? apiRequestFormatter(data) : null,
        data: method === 'POST' || method === 'PUT' ? apiRequestFormatter(data) : null,
        onUploadProgress: (progress: ProgressEvent) => {
          onProgress && onProgress((progress.loaded / progress.total) * 100);
        }
      });

      onProgress && onProgress(100);
      return apiResponseFormatter<T>(response.data || {});
    } catch (err) {
      return this.handleError<T>(err, onProgress, data instanceof FormData ? false : retry ?? true);
    }
  }

  private async handleError<T>(err: AxiosError, onProgress: (progress: number) => void, retry: boolean): Promise<T> {
    if (!err.config || !err.response) throw err;

    if (err.response.status !== 401 || !retry) {
      throw new ApiError(err.config, err.response, err);
    }

    // TODO: watch user
    // const alreadyOpened = await authService.shouldOpenLogin().toPromise();

    // if (alreadyOpened) {
    throw new ApiError(err.config, err.response, err);
    // }

    // return this.request(err.config.method, err.config.url, err.config.data || err.config.params, onProgress, false);
  }
}

const apiService = new ApiService(API_ENDPOINT, tokenService);
export default apiService;

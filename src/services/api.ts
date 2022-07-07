import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { z, ZodError } from 'zod';

import { API_ENDPOINT } from '../settings';
import { apiResponseFormatter } from './../formatters/apiResponse';
import getMockValue from './_mock';

import ApiError from '@/errors/api';
import ApiValidationError from '@/errors/apiValidation';
import { apiRequestFormatter } from '@/formatters/apiRequest';
import { store } from '@/store';

export class ApiService {
  public get<T = any>(url: string, params: any, schema: z.Schema<T>): Promise<T> {
    return this.request<T>('GET', url, params, schema);
  }

  public post<T = any>(url: string, body: any, schema: z.Schema<T>): Promise<T> {
    return this.request<T>('POST', url, body, schema);
  }

  public put<T = any>(url: string, body: any, schema: z.Schema<T>): Promise<T> {
    return this.request<T>('PUT', url, body, schema);
  }

  public delete<T = any>(url: string, params?: any, schema?: z.Schema<T>): Promise<T> {
    return this.request<T>('DELETE', url, params, schema);
  }

  public upload<T = any>(
    options: { url: string; data: FormData; onProgress: (progress: number) => void },
    schema: z.Schema<T>
  ): Promise<T> {
    return this.request<T>('POST', options.url, options.data, schema, options.onProgress);
  }

  private async request<T = any>(
    method: Method,
    url: string,
    data: any,
    schema?: z.Schema,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    let config: AxiosRequestConfig | undefined = undefined,
      response: AxiosResponse | undefined = undefined;

    try {
      onProgress && onProgress(0);
      const authToken = store.getState().authToken.value;

      config = {
        baseURL: API_ENDPOINT,
        url,
        method,
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : '',
          'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
        },
        params: method === 'GET' ? apiRequestFormatter(data) : null,
        data: method === 'POST' || method === 'PUT' ? apiRequestFormatter(data) : null,
        onUploadProgress: (progress: ProgressEvent) => {
          onProgress && onProgress((progress.loaded / progress.total) * 100);
        }
      };

      const request = API_ENDPOINT ? axios.request(config) : getMockValue(method, url);
      response = await request;
      onProgress && onProgress(100);
      const responseData = apiResponseFormatter<T>(response.data || {});

      return schema ? schema.parse(responseData) : responseData;
    } catch (err: any) {
      return this.handleError<T>(config, response, err);
    }
  }

  private async handleError<T>(
    config: AxiosRequestConfig<any> | undefined,
    response: AxiosResponse | undefined,
    err: AxiosError<any, any>
  ): Promise<T> {
    if (err instanceof ZodError && config && response) throw new ApiValidationError(config, response, err);
    if (err.isAxiosError) throw new ApiError(err.config, err.response, err);
    throw err;
  }
}

const apiService = new ApiService();
export default apiService;

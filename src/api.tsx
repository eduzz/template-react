import { API_ENDPOINT } from './envs';
import { ApiClient } from './helpers/api/client';

const client = new ApiClient(API_ENDPOINT);

export async function get<T = any>(url: string, params?: any): Promise<T> {
  return client.request<T>({ method: 'GET', url, data: params });
}

export async function post<T = any>(url: string, body?: any): Promise<T> {
  return client.request<T>({ method: 'POST', url, data: body });
}

export async function put<T = any>(url: string, body?: any): Promise<T> {
  return client.request<T>({ method: 'PUT', url, data: body });
}

export async function del<T = any>(url: string, params?: any): Promise<T> {
  return client.request<T>({ method: 'DELETE', url, data: params });
}

export async function upload<T = any>(options: {
  url: string;
  data: FormData;
  onProgress?: (progress: number) => void;
}): Promise<T> {
  return client.request<T>({ method: 'POST', ...options });
}

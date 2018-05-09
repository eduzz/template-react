import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiError } from 'errors/api';
import { API_ENDPOINT } from 'settings';

import { getStore } from './store';

export async function get<T = any>(url: string, params?: any): Promise<T> {
  return await request({ url, method: 'GET', params });
}

export async function post<T = any>(url: string, data: any): Promise<T> {
  return await request({ url, method: 'POST', data });
}

export async function put<T = any>(url: string, data: any): Promise<T> {
  return await request({ url, method: 'PUT', data });
}

export async function del<T = any>(url: string, params?: any): Promise<T> {
  return await request({ url, method: 'DELETE', params });
}

async function request(options: AxiosRequestConfig) {
  try {
    const token = getStore().getState().auth.authToken;
    const result = await axios({
      ...options,
      baseURL: API_ENDPOINT,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-type': 'application/json'
      },
    });
    return result.data;
  } catch (err) {
    handleError(err);
  }
}

function handleError(err: AxiosError): never {
  // if (err.response.status !== 401) {
  throw new ApiError(err.config, err.response, err);
  // }

  // return authService.showLogin().switchMap(() => {
  //   return request(method, url, data);
  // });
}
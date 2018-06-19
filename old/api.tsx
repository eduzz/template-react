import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiError } from 'errors/api';
import { apiRequestFormatter } from 'formatters/apiRequest';
import { apiResponseFormatter } from 'formatters/apiResponse';
import { IApiResponse } from 'interfaces/apiResponse';
import { API_ENDPOINT } from 'settings';

import { getStore } from './store';

export async function get<T extends IApiResponse = IApiResponse>(url: string, params?: any): Promise<T> {
  return await request({ url, method: 'GET', params });
}

export async function post<T extends IApiResponse = IApiResponse>(url: string, data: any): Promise<T> {
  return await request({ url, method: 'POST', data });
}

export async function postMultipart<T extends IApiResponse = IApiResponse>(url: string, data: FormData): Promise<T> {
  return await request({
    url,
    method: 'POST',
    data,
    headers: { 'Content-type': 'multipart/form-data' }
  });
}

export async function put<T extends IApiResponse = IApiResponse>(url: string, data: any): Promise<T> {
  return await request({ url, method: 'PUT', data });
}

export async function del<T extends IApiResponse = IApiResponse>(url: string, params?: any): Promise<T> {
  return await request({ url, method: 'DELETE', params });
}

async function request(options: AxiosRequestConfig, retry: boolean = true) {
  try {
    options.params = options.params ? apiRequestFormatter(options.params) : null;
    options.data = options.data ? apiRequestFormatter(options.data) : null;

    const token = getStore().getState().auth.authToken;
    const result = await axios({
      ...options,
      baseURL: API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
        ...options.headers
      },
    });
    return apiResponseFormatter(result.data);
  } catch (err) {
    return await handleError(err, retry);
  }
}

async function handleError(err: AxiosError, retry: boolean) {
  if (!err.response || err.response.status !== 401 || !retry) {
    throw new ApiError(err.config, err.response, err);
  }

  return new Promise(resolve => {
    getStore().dispatch({ type: 'OPEN_LOGIN_DIALOG' });
    getStore().subscribe(() => {
      const state = getStore().getState();
      if (!state.auth.isAuthenticated) return;

      resolve(request(err.config, false));
    });
  });
}
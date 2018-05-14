import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiError } from 'errors/api';
import { IAppDefaultApiResponse } from 'interfaces/apiResponse';
import { API_ENDPOINT } from 'settings';

import { getStore } from './store';

export async function get<T = IAppDefaultApiResponse>(url: string, params?: any): Promise<T> {
  return await request({ url, method: 'GET', params });
}

export async function post<T = IAppDefaultApiResponse>(url: string, data: any): Promise<T> {
  return await request({ url, method: 'POST', data });
}

export async function put<T = IAppDefaultApiResponse>(url: string, data: any): Promise<T> {
  return await request({ url, method: 'PUT', data });
}

export async function del<T = IAppDefaultApiResponse>(url: string, params?: any): Promise<T> {
  return await request({ url, method: 'DELETE', params });
}

async function request(options: AxiosRequestConfig, retry: boolean = true) {
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
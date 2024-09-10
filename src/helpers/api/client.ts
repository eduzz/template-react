import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

import useAuthStore from '@/stores/auth';

import getMockValue from './_mock';
import ApiError from './error';
import { responseFormatter } from './formatter';
import decodeJWTToken from '../jwt';

interface ApiClientRequestOptions {
  method: Method;
  url: string;
  data: any;
  onProgress?: (progress: number) => void;
  skipToken?: boolean;
}

export class ApiClient {
  private refreshTokenInProgress: Promise<string> | null = null;

  constructor(private readonly endpoint: string) {}

  public async request<T = any>({ method, url, data, onProgress, skipToken }: ApiClientRequestOptions): Promise<T> {
    try {
      if (onProgress) onProgress(0);
      const config: AxiosRequestConfig = {
        baseURL: url.startsWith('http') ? undefined : this.endpoint,
        url,
        method,
        headers: await this.getHeaders(data, skipToken),
        params: method === 'GET' ? data : null,
        data: method === 'POST' || method === 'PUT' ? data : null,
        onUploadProgress: progress => {
          if (onProgress) onProgress((progress.loaded / (progress.total ?? 0)) * 100);
        }
      };

      const response = this.endpoint ? await axios.request(config) : await getMockValue(method, url);
      if (onProgress) onProgress(100);

      return responseFormatter<T>(response?.data || {});
    } catch (err: any) {
      return this.handleError(err);
    }
  }

  public refreshSession() {
    const { refreshToken } = useAuthStore.getState();

    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = this.request<{ authToken: string }>({
        method: 'POST',
        url: '/auth/refresh',
        data: { refreshToken },
        skipToken: true
      })
        .then(({ authToken }) => {
          useAuthStore.getState().setAuthToken(authToken);
          return authToken;
        })
        .finally(() => {
          this.refreshTokenInProgress = null;
        });
    }

    return this.refreshTokenInProgress;
  }

  private handleError(err: AxiosError): never {
    if (!err?.isAxiosError) {
      throw err;
    }

    const { authToken, refreshToken, clear } = useAuthStore.getState();

    if (err.response?.status === 401 && (authToken || refreshToken)) {
      clear();
    }

    throw new ApiError(err.config, err.response, err);
  }

  private async getHeaders(data?: any, skipToken?: boolean) {
    const headers: Record<string, string> = {
      'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
    };

    if (skipToken) {
      return headers;
    }

    const authToken = await this.getAuthToken();

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    return headers;
  }

  private getAuthToken() {
    const { authToken, refreshToken } = useAuthStore.getState();
    const validAccess = this.verifyTokenExp(authToken);

    if (validAccess) return validAccess;
    if (!refreshToken) return null;

    return this.refreshSession();
  }

  private verifyTokenExp(token: string | undefined | null): string | undefined {
    try {
      if (!token) return undefined;

      const exp = decodeJWTToken<any>(token)?.exp;
      const isExpired = exp < Date.now() / 1000;

      if (isExpired) return undefined;

      return token;
    } catch (_err) {
      return undefined;
    }
  }
}

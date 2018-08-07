import axios, { AxiosError, AxiosResponse } from 'axios';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';

import { ApiError } from '../errors/api';
import { API_ENDPOINT } from '../settings';
import authService from './auth';
import logService, { LogService } from './log';
import tokenService, { TokenService } from './token';

export class ApiService {
  constructor(
    private apiEndpoint: string,
    private logService: LogService,
    private tokenService: TokenService
  ) { }

  public get<T = any>(url: string, params?: any): rxjs.Observable<T> {
    return this.request('GET', url, params);
  }

  public post<T = any>(url: string, body: any): rxjs.Observable<T> {
    return this.request('POST', url, body);
  }

  public delete<T = any>(url: string, params?: any): rxjs.Observable<T> {
    return this.request('DELETE', url, params);
  }

  private request<T>(method: string, url: string, data: any = null, retry: boolean = true): rxjs.Observable<T> {
    return this.tokenService.getToken().pipe(
      rxjsOperators.first(),
      rxjsOperators.map(token => token ? { Authorization: `bearer ${token}` } : null),
      rxjsOperators.switchMap(headers => {
        return axios.request({
          baseURL: this.apiEndpoint,
          url,
          method,
          timeout: 30000,
          headers: {
            'Content-type': 'application/json',
            ...headers
          },
          params: method === 'GET' ? data : null,
          data: method === 'POST' ? data : null
        });
      }),
      rxjsOperators.switchMap(res => this.checkNewToken(res)),
      rxjsOperators.map(res => res.data),
      rxjsOperators.catchError(err => this.handleError(err, retry))
    );
  }

  private checkNewToken(response: AxiosResponse): rxjs.Observable<AxiosResponse> {
    const token = response.headers['x-token'];

    if (!token) {
      return rxjs.of(response);
    }

    this.logService.breadcrumb('Api New Token', 'manual', token);

    return this.tokenService.setToken(token).pipe(
      rxjsOperators.map(() => response)
    );
  }

  private handleError(err: AxiosError, retry: boolean) {
    if (!err.config) return rxjs.throwError(err);

    if (err.response.status !== 401 || !retry) {
      return rxjs.throwError(new ApiError(err.config, err.response, err));
    }

    authService.openLogin();
    return authService.getUser().pipe(
      rxjsOperators.skip(1),
      rxjsOperators.switchMap(user => {
        if (!user) {
          return rxjs.throwError(new ApiError(err.config, err.response, err));
        }

        return this.request(
          err.config.method,
          err.config.url,
          err.config.data || err.config.params,
          false
        );
      })
    );
  }

}

const apiService = new ApiService(API_ENDPOINT, logService, tokenService);
export const publicApiService = new ApiService(API_ENDPOINT, logService, tokenService);

export default apiService;
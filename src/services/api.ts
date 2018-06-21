import axios, { AxiosError } from 'axios';
import { ApiError } from 'errors/api';
import { apiRequestFormatter } from 'formatters/apiRequest';
import { apiResponseFormatter } from 'formatters/apiResponse';
import { IApiResponse } from 'interfaces/apiResponse';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';
import { API_ENDPOINT } from 'settings';

import authService from './auth';
import tokenService, { TokenService } from './token';

export class ApiService {
  constructor(
    private apiEndpoint: string,
    private tokenService: TokenService
  ) { }

  public get<T extends IApiResponse = IApiResponse>(url: string, params?: any): rxjs.Observable<T> {
    return this.request('GET', url, params);
  }

  public post<T extends IApiResponse = IApiResponse>(url: string, body: any): rxjs.Observable<T> {
    return this.request('POST', url, body);
  }

  public put<T extends IApiResponse = IApiResponse>(url: string, body: any): rxjs.Observable<T> {
    return this.request('PUT', url, body);
  }

  public delete<T extends IApiResponse = IApiResponse>(url: string, params?: any): rxjs.Observable<T> {
    return this.request('DELETE', url, params);
  }

  private request<T>(method: string, url: string, data: any = null, retry: boolean = true): rxjs.Observable<T> {
    data = data ? apiRequestFormatter(data) : null;

    return this.tokenService.getToken().pipe(
      rxjsOperators.first(),
      rxjsOperators.map(token => token ? { Authorization: `Bearer ${token}` } : null),
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
          data: method === 'POST' || method === 'PUT' ? data : null
        });
      }),
      rxjsOperators.map(res => apiResponseFormatter(res.data)),
      rxjsOperators.catchError(err => this.handleError(err, retry))
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

const apiService = new ApiService(API_ENDPOINT, tokenService);
export const publicApiService = new ApiService(API_ENDPOINT, tokenService);

export default apiService;
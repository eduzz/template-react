import axios, { AxiosError } from 'axios';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';

import { ApiError } from '../errors/api';
import { API_ENDPOINT } from '../settings';
import { apiResponseFormatter } from './../formatters/apiResponse';
import authService from './auth';
import tokenService, { TokenService } from './token';

export class ApiService {
  constructor(
    private apiEndpoint: string,
    private tokenService: TokenService
  ) { }

  public get<T = any>(url: string, params?: any): rxjs.Observable<IApiResponse<T>> {
    return this.request('GET', url, params);
  }

  public post<T = any>(url: string, body: any): rxjs.Observable<IApiResponse<T>> {
    return this.request('POST', url, body);
  }

  public delete<T = any>(url: string, params?: any): rxjs.Observable<IApiResponse<T>> {
    return this.request('DELETE', url, params);
  }

  private request<T>(method: string, url: string, data: any = null, retry: boolean = true): rxjs.Observable<IApiResponse<T>> {
    return this.tokenService.getAccessToken().pipe(
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
          data: method === 'POST' ? data : null
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
export default apiService;
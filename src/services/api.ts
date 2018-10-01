import axios, { AxiosError, AxiosResponse } from 'axios';
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
    return this.request<T>('GET', url, params).pipe(
      rxjsOperators.map(({ response }) => response),
      rxjsOperators.filter(response => !!response)
    );
  }

  public post<T = any>(url: string, body: any): rxjs.Observable<IApiResponse<T>> {
    return this.request<T>('POST', url, body).pipe(
      rxjsOperators.map(({ response }) => response),
      rxjsOperators.filter(response => !!response)
    );
  }

  public put<T = any>(url: string, body: any): rxjs.Observable<IApiResponse<T>> {
    return this.request<T>('PUT', url, body).pipe(
      rxjsOperators.map(({ response }) => response),
      rxjsOperators.filter(response => !!response)
    );
  }

  public delete<T = any>(url: string, params?: any): rxjs.Observable<IApiResponse<T>> {
    return this.request<T>('DELETE', url, params).pipe(
      rxjsOperators.map(({ response }) => response),
      rxjsOperators.filter(response => !!response)
    );
  }

  public upload<T = any>(url: string, data: FormData) {
    return this.request<T>('POST', url, data);
  }

  private request<T = any>(
    method: string,
    url: string,
    data: any = null,
    retry: boolean = true
  ): rxjs.Observable<{ response: IApiResponse<T>, progress: number }> {
    const progress$ = new rxjs.BehaviorSubject(0);

    return this.tokenService.getTokens().pipe(
      rxjsOperators.first(),
      rxjsOperators.map(tokens => {
        if (!tokens) return null;

        return {
          Authorization: `Bearer ${tokens.token}`,
          RefreshToken: tokens.refresh_token,
          'Content-type': data instanceof FormData ?
            'multipart/form-data' :
            'application/json'
        };
      }),
      rxjsOperators.switchMap(headers => {
        return axios.request({
          baseURL: this.apiEndpoint,
          url,
          method,
          headers,
          params: method === 'GET' ? data : null,
          data: method === 'POST' || method === 'PUT' ? data : null,
          onUploadProgress: (progress: ProgressEvent) => {
            const result = progress.loaded / progress.total;
            progress$.next(result * 100);
          }
        });
      }),
      rxjsOperators.tap(() => {
        progress$.next(100);
        // progress$.complete();
      }),
      rxjsOperators.switchMap(res => this.checkNewToken(res)),
      rxjsOperators.map(res => apiResponseFormatter<IApiResponse<T>>(res.data)),
      rxjsOperators.startWith(null),
      rxjsOperators.combineLatest(
        progress$.pipe(rxjsOperators.distinctUntilChanged()),
        (response, progress) => ({ response, progress })
      ),
      rxjsOperators.catchError(err => {
        progress$.complete();
        return this.handleError(err, retry);
      }),
    );
  }

  private checkNewToken(response: AxiosResponse): rxjs.Observable<AxiosResponse> {
    const token = response.headers['x-token'];

    if (!token) {
      return rxjs.of(response);
    }

    return this.tokenService.setAccessToken(token).pipe(
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

const apiService = new ApiService(API_ENDPOINT, tokenService);
export default apiService;
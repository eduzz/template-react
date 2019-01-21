import axios, { AxiosError, AxiosResponse } from 'axios';
import ApiError from 'errors/api';
import { apiRequestFormatter } from 'formatters/apiRequest';
import IApiResponse from 'interfaces/apiResonse';
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';

import { API_ENDPOINT } from '../settings';
import { apiResponseFormatter } from './../formatters/apiResponse';
import authService from './auth';
import tokenService, { TokenService } from './token';

export class ApiService {
  constructor(
    private apiEndpoint: string,
    private tokenService: TokenService
  ) { }

  public get<T = any>(url: string, params?: any): Rx.Observable<IApiResponse<T>> {
    return this.request<T>('GET', url, params).pipe(
      RxOp.map(({ response }) => response),
      RxOp.filter(response => response !== undefined)
    );
  }

  public post<T = any>(url: string, body: any): Rx.Observable<IApiResponse<T>> {
    return this.request<T>('POST', url, body).pipe(
      RxOp.map(({ response }) => response),
      RxOp.filter(response => response !== undefined)
    );
  }

  public put<T = any>(url: string, body: any): Rx.Observable<IApiResponse<T>> {
    return this.request<T>('PUT', url, body).pipe(
      RxOp.map(({ response }) => response),
      RxOp.filter(response => response !== undefined)
    );
  }

  public delete<T = any>(url: string, params?: any): Rx.Observable<IApiResponse<T>> {
    return this.request<T>('DELETE', url, params).pipe(
      RxOp.map(({ response }) => response),
      RxOp.filter(response => response !== undefined)
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
  ): Rx.Observable<{ response: IApiResponse<T>, progress: number }> {
    const progress$ = new Rx.BehaviorSubject(0);

    return this.tokenService.getTokens().pipe(
      RxOp.first(),
      RxOp.map(tokens => {
        if (!tokens) return null;

        return {
          Authorization: `Bearer ${tokens.token}`,
          RefreshToken: tokens.refresh_token,
          'Content-Type': data instanceof FormData ?
            'multipart/form-data' :
            'application/json'
        };
      }),
      RxOp.switchMap(headers => {
        return axios.request({
          baseURL: this.apiEndpoint,
          url,
          method,
          headers,
          params: method === 'GET' ? apiRequestFormatter(data) : null,
          data: method === 'POST' || method === 'PUT' ? apiRequestFormatter(data) : null,
          onUploadProgress: (progress: ProgressEvent) => {
            const result = progress.loaded / progress.total;
            progress$.next(result * 100);
          }
        });
      }),
      RxOp.tap(() => progress$.next(100)),
      RxOp.switchMap(res => this.checkNewToken(res)),
      RxOp.map(res => apiResponseFormatter<IApiResponse<T>>(res.data) || null),
      RxOp.startWith(undefined),
      RxOp.combineLatest(
        progress$.pipe(RxOp.distinctUntilChanged()),
        (response, progress) => ({ response, progress })
      ),
      RxOp.catchError(err => {
        progress$.complete();
        return this.handleError(err, retry);
      }),
    );
  }

  private checkNewToken(response: AxiosResponse): Rx.Observable<AxiosResponse> {
    const token = response.headers['x-token'];

    if (!token) {
      return Rx.of(response);
    }

    return this.tokenService.setAccessToken(token).pipe(
      RxOp.map(() => response)
    );
  }
  private handleError(err: AxiosError, retry: boolean) {
    if (!err.config || !err.response) return Rx.throwError(err);

    if (err.response.status !== 401 || !retry) {
      return Rx.throwError(new ApiError(err.config, err.response, err));
    }

    authService.openLogin();
    return authService.getUser().pipe(
      RxOp.skip(1),
      RxOp.switchMap(user => {
        if (!user) {
          return Rx.throwError(new ApiError(err.config, err.response, err));
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
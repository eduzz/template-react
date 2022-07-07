import { AxiosRequestConfig, AxiosResponse } from 'axios';

import ApiError from './api';

export default class ApiValidationError extends ApiError {
  constructor(request: AxiosRequestConfig, axiosResponse: AxiosResponse, err: any) {
    super(request, axiosResponse, err);
    this.message = 'api-validation-error';
  }
}

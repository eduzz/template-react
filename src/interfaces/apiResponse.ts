import { IPaginationResponse } from './pagination';

export interface IApiResponse<T = any> {
  success: boolean;
  data: T;
}

export interface IPaginationApiResponse<T> extends IApiResponse<T> {
  paginator: IPaginationResponse;
}
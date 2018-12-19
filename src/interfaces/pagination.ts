export interface IPaginationParams {
  search?: string;
  page?: number;
  size?: number;
  orderby?: string;
  order?: 'asc' | 'desc';
}

export interface IPaginationResponse<T> extends IApiResponse<T[]> {
}
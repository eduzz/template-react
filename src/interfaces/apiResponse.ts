export interface IApiResponse<T = any> {
  success: boolean;
  data: T;
}

export interface IPaginationApiResponse<T> extends IApiResponse<T> {
  paginator: {
    page: number;
    size: number;
    total_pages: number;
    total_rows: number;
  };
}
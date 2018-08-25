export interface IPaginationParams {
  page: number;
  size: number;
}

export interface IPaginationResponse<T> extends IPaginationParams {
  results: T[];
  total_rows: number;
  total_pages: number;
}
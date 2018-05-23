export interface IPaginationParams {
  page: number;
  size: number;
}

export interface IPaginationResponse {
  page: number;
  size: number;
  totalRows: number;
  totalPages: number;
}
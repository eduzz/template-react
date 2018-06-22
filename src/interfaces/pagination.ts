export interface IPaginationParams {
  term?: string;
  page: number;
  size: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface IPaginationResponse {
  page: number;
  size: number;
  totalRows: number;
  totalPages: number;
}
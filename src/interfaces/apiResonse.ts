interface IApiResponse<T> {
  success: boolean;
  data: T;
  paginator: {
    page: number;
    size: number;
    total_pages: number;
    total_rows: number;
  };
}
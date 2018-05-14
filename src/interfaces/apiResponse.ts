export interface IAppDefaultApiResponse<T = any> {
  success: boolean;
  data: T;
}
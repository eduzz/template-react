export interface ICache<T = any> {
  data: T;
  createdAt: Date;
  expirationDate: Date;
}
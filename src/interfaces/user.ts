import { IStoreItemStatus } from './storeItemStatus';

export interface IUser extends IStoreItemStatus {
  id: number;
  name: string;
  email: string;
  course: string;
  group: string;
}
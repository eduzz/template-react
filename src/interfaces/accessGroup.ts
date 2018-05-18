import { IAccessGroupModule } from './accessGroupModule';
import { IStoreItemStatus } from './storeItemStatus';

export interface IAccessGroup extends IStoreItemStatus {
  id: number;
  name: string;
  modules?: IAccessGroupModule[];
}
import { IAccessGroupModule } from './accessGroupModule';
import { IStoreItemStatus } from './storeItemStatus';

export interface IAccessGroup extends IStoreItemStatus {
  id: number;
  name: string;
  modules?: Array<IAccessGroupModule & {
    view?: boolean;
    create?: boolean;
    edit?: boolean;
    delete?: boolean;
  }
  >;
}
import { IAccessGroupModule } from './accessGroupModule';

export interface IAccessGroup {
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
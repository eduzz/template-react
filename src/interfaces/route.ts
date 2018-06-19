import { MdiReactIconComponentType } from 'mdi-react';

export interface IAppRoute {
  path: string;
  exact?: boolean;
  component: any;
  allowAnonymous?: boolean;
  sideDrawer?: {
    icon?: MdiReactIconComponentType;
    order?: number;
    display: string;
  };
  roles?: string[];
  subRoutes?: IAppRoute[];
}
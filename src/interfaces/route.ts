import { MdiReactIconComponentType } from 'mdi-react';
import { ComponentType } from 'react';

export interface IAppRoute {
  path: string;
  exact?: boolean;
  component: ComponentType & { routes?: IAppRoute[] };
  allowAnonymous?: boolean;
  sideDrawer?: {
    icon?: MdiReactIconComponentType;
    display: string;
    order?: number;
  };
  roles?: string[];
}
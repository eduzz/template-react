import { MdiReactIconComponentType } from 'mdi-react';
import { ComponentClass } from 'react';

export interface IAppRoute {
  path: string;
  exact?: boolean;
  component: ComponentClass & { routes?: IAppRoute[] };
  allowAnonymous?: boolean;
  sideDrawer?: {
    icon?: MdiReactIconComponentType;
    display: string;
    order?: number;
  };
  roles?: string[];
}
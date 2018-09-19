import MoreHorizIcon from 'mdi-react/MoreHorizIcon';
import { ComponentType } from 'react';

export interface IAppRoute {
  path: string;
  exact?: boolean;
  component: ComponentType & { routes?: IAppRoute[] };
  allowAnonymous?: boolean;
  sideDrawer?: {
    icon?: typeof MoreHorizIcon;
    display: string;
    order?: number;
  };
  roles?: string[];
}
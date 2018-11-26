import MoreHorizIcon from 'mdi-react/MoreHorizIcon';

export interface IAppRoute {
  path: string;
  exact?: boolean;
  component: any;
  allowAnonymous?: boolean;
  sideDrawer?: {
    icon?: typeof MoreHorizIcon;
    display: string;
    order?: number;
  };
  roles?: string[];
}
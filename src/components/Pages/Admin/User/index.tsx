import { IAppRoute } from 'interfaces/route';
import { PureComponent } from 'react';

import UserListPage from './List';

export default class UserIndexPage extends PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/',
    exact: true,
    sideDrawer: { display: 'Lista' },
    component: UserListPage
  }];

  render() {
    return this.props.children;
  }
}
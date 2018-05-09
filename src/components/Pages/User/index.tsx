import { IAppRoute } from 'interfaces/route';
import * as React from 'react';

import UserListPage from './list';

export default class UserIndexPage extends React.PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/',
    component: UserListPage
  }];

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

import { IAppRoute } from 'interfaces/route';
import * as React from 'react';

import UserTabsPage from './Tabs';

export default class UserIndexPage extends React.PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/',
    component: UserTabsPage
  }];

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

import { IAppRoute } from 'interfaces/route';
import * as React from 'react';

import AccessGroupFormModal from './AccessGroupFormModal';
import UserTabsPage from './Tabs';
import UserFormModal from './UserFormModal';

export default class UserIndexPage extends React.PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/',
    component: UserTabsPage
  }];

  render() {
    return (
      <div>
        <UserFormModal />
        <AccessGroupFormModal />

        {this.props.children}
      </div>
    );
  }
}

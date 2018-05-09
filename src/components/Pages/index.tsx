import AppWrapper from 'components/AppWrapper';
import { IAppRoute } from 'interfaces/route';
import { PeopleIcon, ViewDashboardIcon } from 'mdi-react';
import * as React from 'react';

import DashboardIndexPage from './Dashboard';
import UserIndexPage from './User';

export default class AdminModule extends React.PureComponent {
  public static routes: IAppRoute[] = [
    {
      path: '/',
      sideDrawer: { display: 'Dashboard', icon: ViewDashboardIcon },
      exact: true,
      roles: [],
      component: DashboardIndexPage,
      subRoutes: DashboardIndexPage.routes
    },
    {
      path: '/user',
      sideDrawer: { display: 'Usuários', icon: PeopleIcon },
      roles: ['admin'],
      component: UserIndexPage,
      subRoutes: UserIndexPage.routes
    }
  ];

  render() {
    return (
      <AppWrapper routes={AdminModule.routes}>
        {this.props.children}
      </AppWrapper>
    );
  }
}

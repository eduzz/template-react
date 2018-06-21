import AppWrapper from 'components/AppWrapper';
import { IAppRoute } from 'interfaces/route';
import PeopleIcon from 'mdi-react/PeopleIcon';
import SchoolIcon from 'mdi-react/SchoolIcon';
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon';
import * as React from 'react';

import CourseIndexPage from './Course';
import DashboardIndexPage from './Dashboard';
import PackageIndexPage from './Package';
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
      path: '/course',
      sideDrawer: { display: 'Cursos', icon: SchoolIcon },
      component: CourseIndexPage,
      subRoutes: CourseIndexPage.routes
    },
    {
      path: '/user',
      sideDrawer: { display: 'Usuários', icon: PeopleIcon },
      roles: ['admin'],
      component: UserIndexPage,
      subRoutes: UserIndexPage.routes
    }
    ,
    {
      path: '/packages',
      sideDrawer: { display: 'Pacotes', icon: PeopleIcon },
      roles: ['admin'],
      component: PackageIndexPage,
      subRoutes: PackageIndexPage.routes
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

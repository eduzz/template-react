import AppWrapper from 'components/AppWrapper';
import { IAppRoute } from 'interfaces/route';
import PeopleIcon from 'mdi-react/PeopleIcon';
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon';
import * as React from 'react';

import DashboardIndexPage from './Dashboard';
import UserIndexPage from './User';

// import UserIndexPage from './User';

// import CourseIndexPage from './Course';
export default class AdminModule extends React.PureComponent {
  public static routes: IAppRoute[] = [
    // {
    //   path: '/course',
    //   sideDrawer: { display: 'Cursos', icon: SchoolIcon },
    //   component: CourseIndexPage,
    //   subRoutes: CourseIndexPage.routes
    // },
    {
      path: '/user',
      sideDrawer: { display: 'Usuários', order: 1, icon: PeopleIcon },
      roles: ['admin'],
      component: UserIndexPage,
      subRoutes: UserIndexPage.routes
    },
    {
      path: '/',
      sideDrawer: { display: 'Dashboard', order: 0, icon: ViewDashboardIcon },
      exact: true,
      roles: [],
      component: DashboardIndexPage,
      subRoutes: DashboardIndexPage.routes
    },
  ];

  render() {
    return (
      <AppWrapper routes={AdminModule.routes}>
        {this.props.children}
      </AppWrapper>
    );
  }
}

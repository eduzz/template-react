import AppWrapper from 'components/AppWrapper';
import { IAppRoute } from 'interfaces/route';
import PeopleIcon from 'mdi-react/PeopleIcon';
import SchoolIcon from 'mdi-react/SchoolIcon';
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon';
import * as React from 'react';

import CourseIndexPage from './Course';
import DashboardIndexPage from './Dashboard';
import UserIndexPage from './User';

export default class AdminModule extends React.PureComponent {
  public static routes: IAppRoute[] = [
    {
      path: '/course',
      sideDrawer: { display: 'Cursos', order: 2, icon: SchoolIcon },
      component: CourseIndexPage,
    },
    {
      path: '/user',
      sideDrawer: { display: 'Usuários', order: 1, icon: PeopleIcon },
      roles: ['admin'],
      component: UserIndexPage
    },
    {
      path: '/',
      sideDrawer: { display: 'Dashboard', order: 0, icon: ViewDashboardIcon },
      roles: [],
      exact: true,
      component: DashboardIndexPage
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

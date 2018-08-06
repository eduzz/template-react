import { IAppRoute } from 'interfaces/route';
import * as React from 'react';

import AdminModule from './Admin';
import NewPasswordPage from './Public/NewPassword';

export default class Pages extends React.PureComponent {
  public static routes: IAppRoute[] = [
    {
      path: '/nova-senha',
      exact: true,
      allowAnonymous: true,
      component: NewPasswordPage
    },
    {
      path: '/',
      component: AdminModule
    },
  ];

  render() {
    return this.props.children;
  }
}

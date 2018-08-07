import AppWrapper from 'components/Layout/AppWrapper';
import { IAppRoute } from 'interfaces/route';
import { enRoles } from 'interfaces/user';
import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon';
import StarIcon from 'mdi-react/StarIcon';
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon';
import * as React from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

import DashboardIndexPage from './Dashboard';
import ExtraIndexPage from './Extra';
import UserIndexPage from './User';

interface IState {
  routes: IAppRoute[];
}

export default class AdminModule extends React.PureComponent<{}, IState>  {
  static routes: IAppRoute[] = [
    {
      path: '/pessoas',
      sideDrawer: { display: 'Pessoas', order: 1, icon: AccountMultipleIcon },
      roles: [enRoles.admin],
      component: UserIndexPage
    },
    {
      path: '/Extra',
      sideDrawer: { display: 'Extra', order: 2, icon: StarIcon },
      roles: [],
      component: ExtraIndexPage
    },
    {
      path: '/',
      sideDrawer: { display: 'Dashboard', order: 0, icon: ViewDashboardIcon },
      exact: true,
      roles: [],
      component: DashboardIndexPage
    },
  ];

  constructor(props: {}) {
    super(props);
    this.state = { routes: [] };
  }

  componentDidMount() {
    authService.getUser().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(user => {
      if (!user) {
        this.setState({ routes: [] });
        return;
      }

      this.setState({
        routes: AdminModule.routes.filter(route => user.canAccess(...route.roles))
      });
    });
  }

  render() {
    const { routes } = this.state;

    return (
      <AppWrapper routes={routes}>
        {this.props.children}
      </AppWrapper>
    );
  }
}

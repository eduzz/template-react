import { List } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import AppDrawerUser from 'components/Drawer/UserMenu';
import AppRouter, { RouterContext } from 'components/Router';
import { WithStyles } from 'decorators/withStyles';
import { DeepReadonly } from 'helpers/immutable';
import { IAppRoute } from 'interfaces/route';
import { IUserToken } from 'interfaces/userToken';
import React, { PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

import { DrawerContext, IDrawerContext } from '../AppWrapper';
import DrawerListItem from './ListItem';
import { IAppRouteParsed, parseRoutes } from './parser';

interface IState {
  user?: DeepReadonly<IUserToken>;
  routes: IAppRouteParsed[];
}

interface IProps {
  routes: IAppRoute[];
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: '100vh'
  },
  header: {
    padding: '10px 0',
    textAlign: 'center',
    background: darken(theme.palette.primary.main, 0.15)
  },
  logo: {
    maxWidth: 170,
    maxHeight: 100,
    margin: '10px 0'
  },
  list: {
    padding: 0
  }
}))
export default class AppDrawer extends PureComponent<IProps, IState> {
  getRouter: () => AppRouter;
  drawer: IDrawerContext;

  constructor(props: any) {
    super(props);
    this.state = { routes: [] };
  }

  static getDerivedStateFromProps(props: IProps, currentState: IState): IState {
    return {
      ...currentState,
      routes: parseRoutes(props.routes)
    };
  }

  componentDidMount() {
    authService.getUser().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(user => this.setState({ user }));
  }

  toRoute = (route: IAppRoute) => {
    this.drawer.close();
    this.getRouter().navigate(route.path);
  }

  render() {
    const { routes, user } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <RouterContext.Consumer>
          {getRouter => (this.getRouter = getRouter) && null}
        </RouterContext.Consumer>

        <DrawerContext.Consumer>
          {drawer => (this.drawer = drawer) && null}
        </DrawerContext.Consumer>

        <div className={classes.header}>
          <img src={require('assets/images/logo-white.png')} className={classes.logo} />
          <AppDrawerUser user={user} />
        </div>

        <List className={classes.list}>
          {routes.map(route =>
            <DrawerListItem key={route.path} user={user} route={route} onClick={this.toRoute} />
          )}
        </List>
      </div>
    );
  }
}
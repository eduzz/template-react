import { List } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import logoWhite from 'assets/images/logo-white.png';
import AppRouter, { RouterContext } from 'components/Router';
import { WithStyles } from 'decorators/withStyles';
import { DeepReadonly } from 'helpers/immutable';
import { IAppRoute } from 'interfaces/route';
import { IUserToken } from 'interfaces/userToken';
import React, { PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

import DrawerListItem from './ListItem';
import { IAppRouteParsed, routeParser } from './routeParser';
import AppDrawerUser from './UserMenu';

interface IState {
  user?: DeepReadonly<IUserToken>;
  routes: IAppRouteParsed[];
}

interface IProps {
  routes: IAppRoute[];
  classes?: any;
  router?: AppRouter;
  drawer?: IDrawerContext;
}

export interface IDrawerContext {
  open(): void;
  close(): void;
}

export const DrawerContext = React.createContext<IDrawerContext>(null);

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
class AppDrawer extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { routes: [] };
  }

  static getDerivedStateFromProps(props: IProps, currentState: IState): IState {
    return {
      ...currentState,
      routes: routeParser(props.routes)
    };
  }

  componentDidMount() {
    authService.getUser().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(user => this.setState({ user }));
  }

  toRoute = (route: IAppRoute) => {
    this.props.drawer.close();
    this.props.router.navigate(route.path);
  }

  render() {
    const { routes, user } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <img src={logoWhite} className={classes.logo} />
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

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router =>
      <DrawerContext.Consumer>
        {drawer => <AppDrawer {...props} ref={ref} router={router} drawer={drawer} />}
      </DrawerContext.Consumer>
    }
  </RouterContext.Consumer>
));
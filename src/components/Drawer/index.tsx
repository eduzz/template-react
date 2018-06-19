import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import AppDrawerUser from 'components/Drawer/UserMenu';
import AppRouter, { RouterContext } from 'components/Router';
import { WithStyles } from 'decorators/withStyles';
import { IAppRoute } from 'interfaces/route';
import React, { PureComponent } from 'react';

import { DrawerContext, IDrawerContext } from '../AppWrapper';

interface IState {
  routes: IAppRoute[];
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
    marginBottom: 20
  },
  list: {
    padding: 0
  },
  item: {
    paddingLeft: 14
  },
  icon: {
    margin: '0'
  },
  text: {
    color: 'inherit'
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
      routes: props.routes.filter(r => r.sideDrawer).sort((a, b) => {
        return a.sideDrawer.order > b.sideDrawer.order ? 1 :
          a.sideDrawer.order < b.sideDrawer.order ? -1 : 0;
      })
    };
  }

  toRoute(route: IAppRoute) {
    this.drawer.close();
    this.getRouter().navigate(route.path);
  }

  render() {
    const { routes } = this.state;
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
          <AppDrawerUser />
        </div>

        <List className={classes.list}>
          {routes.map((route, index) =>
            <ListItem button key={index} className={classes.item} onClick={this.toRoute.bind(this, route)}>
              {!!route.sideDrawer.icon &&
                <ListItemIcon className={classes.icon} classes={{ root: classes.text }}>
                  <route.sideDrawer.icon />
                </ListItemIcon>
              }
              <ListItemText primary={route.sideDrawer.display} classes={{ primary: classes.text }} />
            </ListItem>
          )}
        </List>
      </div>
    );
  }
}
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import AppDrawerUser from 'components/Drawer/UserMenu';
import AppRouter, { RouterContext } from 'components/Router';
import { WithStyles } from 'decorators/withStyles';
import { IAppRoute } from 'interfaces/route';
import React, { PureComponent } from 'react';

interface IProps {
  closeDrawer: Function;
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
    maxWidth: '150px',
    marginTop: '10px'
  },
  icon: {
    margin: '0'
  },
  text: {
    color: 'inherit'
  }
}))
export default class AppDrawer extends PureComponent<IProps> {
  getRouter: () => AppRouter;

  constructor(props: any) {
    super(props);
    this.state = { routes: [] };
  }

  toRoute(route: IAppRoute) {
    this.props.closeDrawer();
    this.getRouter().navigate(route.path);
  }

  render() {
    const { closeDrawer, routes, classes } = this.props;

    return (
      <div className={classes.root}>
        <RouterContext.Consumer>
          {getRouter => (this.getRouter = getRouter) && null}
        </RouterContext.Consumer>

        <div className={classes.header}>
          <img src={require('assets/images/logo-white.png')} className={classes.logo} />
          <AppDrawerUser closeDrawer={closeDrawer} />
        </div>

        <List>
          {routes.map((route, index) =>
            <ListItem button key={index} onClick={this.toRoute.bind(this, route)}>
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
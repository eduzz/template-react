import AppDrawerUser from 'components/Drawer/UserMenu';
import AppRouter from 'components/Router';
import { IAppRoute } from 'interfaces/route';
import { List, ListItem, ListItemIcon, ListItemText } from 'material-ui';
import React, { PureComponent } from 'react';

import { RouterContext } from '../Root';

const styles = require('./index.css');

interface IProps {
  closeDrawer: Function;
  routes: IAppRoute[];
}

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
    const { closeDrawer, routes } = this.props;

    return (
      <div className={styles.component}>
        <RouterContext.Consumer>
          {getRouter => (this.getRouter = getRouter) && null}
        </RouterContext.Consumer>

        <div className='header'>
          <img src={require('assets/images/logo-white.png')} className='logo' />
          <AppDrawerUser closeDrawer={closeDrawer} />
        </div>

        <List>
          {routes.map((route, index) =>
            <ListItem button key={index} onClick={this.toRoute.bind(this, route)}>
              {!!route.sideDrawer.icon &&
                <ListItemIcon className='icon' classes={{ root: 'text' }}>
                  <route.sideDrawer.icon />
                </ListItemIcon>
              }
              <ListItemText primary={route.sideDrawer.display} classes={{ primary: 'text' }} />
            </ListItem>
          )}
        </List>
      </div>
    );
  }
}
import Drawer, { IMenu } from 'components/Layout/Drawer';
import PermissionRoute from 'components/Shared/PermissionRoute';
import { WithStyles } from 'decorators/withStyles';
import { enRoles } from 'interfaces/models/user';
import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon';
import DomainIcon from 'mdi-react/DomainIcon';
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon';
import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CompanyIndexPage from './Company';
import DashboardIndexPage from './Dashboard';
import UserIndexPage from './User';

interface IProps {
  classes?: any;
}

export const ScrollTopContext = React.createContext<Function>((() => { }));

@WithStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    padding: theme.variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      padding: theme.variables.contentPaddingUpSm,
    }
  }
}))
export default class AdminPage extends PureComponent<IProps, {}> {
  mainContent: React.RefObject<HTMLMainElement> = React.createRef();
  menu: IMenu[] = [
    { path: '/', display: 'Dashboard', icon: ViewDashboardIcon },
    { path: '/usuarios', display: 'Usuários', role: enRoles.admin, icon: AccountMultipleIcon },
    { path: '/empresa', display: 'Empresa', icon: DomainIcon }
  ];

  scrollTop = () => {
    setTimeout(() => this.mainContent.current.scrollTo(0, 0), 100);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ScrollTopContext.Provider value={this.scrollTop}>
          <Drawer menu={this.menu}>
            <main ref={this.mainContent} className={classes.content}>
              <Switch>
                <PermissionRoute path='/usuarios' role={enRoles.sysAdmin} component={UserIndexPage} />
                <Route path='/empresa' component={CompanyIndexPage} />
                <Route path='/' component={DashboardIndexPage} />
                <Route render={() => <Redirect to='/' />} />
              </Switch>
            </main>
          </Drawer>
        </ScrollTopContext.Provider>
      </div>
    );
  }
}

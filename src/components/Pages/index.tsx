import PermissionRoute from 'components/Shared/PermissionRoute';
import React, { PureComponent } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AdminPage from './Admin';
import NewPasswordPage from './Public/NewPassword';

export default class Pages extends PureComponent {
  renderRedirect = () => <Redirect to='/' />;
  renderReload = () => <div />;

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/nova-senha' component={NewPasswordPage} />
          <PermissionRoute path='/' component={AdminPage} />

          <Route path='/reload' exact render={this.renderReload} />
          <Route render={this.renderRedirect} />
        </Switch>
      </BrowserRouter>
    );
  }
}

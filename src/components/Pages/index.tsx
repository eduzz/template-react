import PermissionRoute from 'components/Shared/PermissionRoute';
import React, { PureComponent } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AdminPage from './Admin';
import NewPasswordPage from './Public/NewPassword';

export default class Pages extends PureComponent {
  renderEmpty = () => <div />;
  renderRedirect = () => <Redirect to='/' />;

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/nova-senha' exact component={NewPasswordPage} />
          <PermissionRoute path='/' component={AdminPage} />

          <Route path='/reload' exact render={this.renderEmpty} />
          <Route render={this.renderRedirect} />
        </Switch>
      </BrowserRouter>
    );
  }
}

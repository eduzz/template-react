import { memo, useCallback } from 'react';

import PermissionRoute from 'components/Shared/PermissionRoute';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AdminPage from './Admin';
import LoginPage from './Public/Login';
import NewPasswordPage from './Public/NewPassword';

const Pages = memo(() => {
  const renderEmpty = useCallback(() => <div />, []);
  const renderRedirect = useCallback(() => <Redirect to='/' />, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/nova-senha' exact component={NewPasswordPage} />
        <Route path='/login' exact component={LoginPage} />
        <PermissionRoute role={null} path='/' component={AdminPage} />

        <Route path='/reload' exact render={renderEmpty} />
        <Route render={renderRedirect} />
      </Switch>
    </BrowserRouter>
  );
});

export default Pages;

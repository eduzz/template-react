import { memo, useCallback } from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AdminPage from './Admin';
import LoginPage from './Public/Login';
import NewPasswordPage from './Public/NewPassword';

import PermissionRoute from '@/components/Shared/PermissionRoute';

const Pages = memo(() => {
  const renderRedirect = useCallback(() => <Redirect to='/' />, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/nova-senha' exact component={NewPasswordPage} />
        <Route path='/login' exact component={LoginPage} />
        <PermissionRoute role={null} path='/' component={AdminPage} />

        <Route render={renderRedirect} />
      </Switch>
    </BrowserRouter>
  );
});

export default Pages;

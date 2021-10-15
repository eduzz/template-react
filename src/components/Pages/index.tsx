import { memo, useCallback } from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AdminPage from './Admin';
import LoginPage from './Public/Login';
import NewPasswordPage from './Public/NewPassword';
import SamplesPage from './Public/Samples';

import PermissionRoute from '@/components/Shared/PermissionRoute';

const Pages = memo(() => {
  const renderEmpty = useCallback(() => <div />, []);
  const renderRedirect = useCallback(() => <Redirect to='/' />, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/nova-senha' exact component={NewPasswordPage} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/exemplos' exact component={SamplesPage} />
        <PermissionRoute role={null} path='/' component={AdminPage} />

        <Route path='/reload' exact render={renderEmpty} />
        <Route render={renderRedirect} />
      </Switch>
    </BrowserRouter>
  );
});

export default Pages;

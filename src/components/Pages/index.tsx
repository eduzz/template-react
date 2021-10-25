import { memo, useCallback } from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AdminPage from './Admin';
import PublicPage from './Public';

import PermissionRoute from '@/components/Shared/PermissionRoute';

const Pages = memo(() => {
  const renderRedirect = useCallback(() => <Redirect to='/' />, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/nova-senha' exact component={PublicPage} />
        <Route path='/login' exact component={PublicPage} />
        <PermissionRoute role={null} path='/' component={AdminPage} />

        <Route render={renderRedirect} />
      </Switch>
    </BrowserRouter>
  );
});

export default Pages;

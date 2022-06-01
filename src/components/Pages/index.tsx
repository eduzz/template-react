import { memo } from 'react';

import { useRoutes } from 'react-router-dom';

import PermissionRoute from '../Shared/PermissionRoute';
import AdminLayout from './Admin';
import DashboardPage from './Admin/Dashboard';
import UserListPage from './Admin/Users/List';
import PublicLayout from './Public';
import LoginPage from './Public/Login';
import NewPasswordPage from './Public/NewPassword';

const Pages = memo(() => {
  const routes = useRoutes([
    {
      path: '/login',
      element: <PublicLayout />,
      children: [{ index: true, element: <LoginPage /> }]
    },
    {
      path: '/nova-senha',
      element: <PublicLayout />,
      children: [{ index: true, element: <NewPasswordPage /> }]
    },
    {
      path: '/',
      element: (
        <PermissionRoute>
          <AdminLayout />
        </PermissionRoute>
      ),
      children: [
        { index: true, element: <DashboardPage /> },
        { path: '/usuarios', element: <UserListPage /> }
      ]
    }
  ]);

  return <>{routes}</>;
});

export default Pages;

import { Navigate, useRoutes } from 'react-router-dom';

import PermissionRoute from '../Shared/PermissionRoute';
import AdminLayout from './Admin';
import SalesPage from './Admin/Sales';
import Login from './Public/Login';
import NotFoundPage from './Public/NotFound';
import WithoutPermission from './Public/WithoutPermission';

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/',
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/',
      element: (
        <PermissionRoute>
          <AdminLayout />
        </PermissionRoute>
      ),
      children: [
        { index: true, path: '/', element: <Navigate to='/dashboard' /> },
        { path: '/dashboard', element: <>Dashboard</> },
        { path: '/sales', element: <SalesPage /> },
        { path: '/without-permission', element: <WithoutPermission /> }
      ]
    },
    {
      path: '*',
      element: <AdminLayout />,
      children: [{ index: true, path: '*', element: <NotFoundPage /> }]
    }
  ]);

  return <>{routes}</>;
};

export default Routes;

import { memo } from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import PermissionHide from './PermissionHide';

import { enRoles } from '@/interfaces/models/user';
import { selectorIsAuthenticated } from '@/store/selectors';

interface IProps {
  role?: enRoles;
  children: React.ReactNode;
}

const PermissionRoute = memo<IProps>(({ role, children }) => {
  const isAuthenticated = useSelector(selectorIsAuthenticated);

  if (isAuthenticated === undefined) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate replace to='/login' />;
  }

  return (
    <>
      <PermissionHide role={role}>{children}</PermissionHide>

      <PermissionHide inverse role={role}>
        <p>Não encontrado</p>
      </PermissionHide>
    </>
  );
});

export default PermissionRoute;

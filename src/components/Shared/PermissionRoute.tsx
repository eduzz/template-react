import { memo, Fragment } from 'react';

import { enRoles } from 'interfaces/models/user';
import { Redirect, RouteProps, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { selectorIsAuthenticated } from 'store/selectors';

import PermissionHide from './PermissionHide';

interface IProps extends RouteProps {
  role?: enRoles;
}

const PermissionRoute = memo<IProps>(({ role, ...props }) => {
  const isAuthenticated = useRecoilValue(selectorIsAuthenticated);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Fragment>
      <PermissionHide role={role}>
        <Route {...props} />
      </PermissionHide>

      <PermissionHide inverse role={role}>
        <p>Não encontrado</p>
      </PermissionHide>
    </Fragment>
  );
});

export default PermissionRoute;

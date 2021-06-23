import { memo, ReactNode, useState } from 'react';
import { useEffect } from 'react';

import { enRoles } from 'interfaces/models/user';
import authService from 'services/auth';

interface IProps {
  passIfNull?: boolean;
  role?: enRoles | enRoles[];
  inverse?: boolean;
  children?: ReactNode;
}

const PermissionHide = memo<IProps>(props => {
  const [canAccess, setCanAccess] = useState(null);

  useEffect(() => {
    const roles = Array.isArray(props.role) ? props.role : props.role ? [props.role] : [];
    const watcher = authService.watchIsAuthenticated(() => {
      setCanAccess(authService.canAccess(...roles));
    });
    return () => watcher();
  }, [props.role]);

  if (canAccess === undefined || canAccess === null) {
    return null;
  }

  if (props.inverse && !canAccess) {
    return props.children as any;
  }

  if (props.inverse || !canAccess) {
    return null;
  }

  return props.children as any;
});

export default PermissionHide;

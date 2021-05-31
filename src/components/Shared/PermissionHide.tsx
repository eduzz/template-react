import { memo, ReactNode } from 'react';

import useObservable from '@eduzz/houston-hooks/useObservable';

import { enRoles } from 'interfaces/models/user';
import authService from 'services/auth';

interface IProps {
  passIfNull?: boolean;
  role?: enRoles | enRoles[];
  inverse?: boolean;
  children?: ReactNode;
}

const PermissionHide = memo<IProps>(props => {
  const [canAccess] = useObservable(() => {
    const roles = Array.isArray(props.role) ? props.role : props.role ? [props.role] : [];
    return authService.canAccess(...roles);
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

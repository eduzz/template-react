import { memo, useMemo, ReactNode } from 'react';

import { enRoles } from 'interfaces/models/user';
import { useRecoilValue } from 'recoil';
import { selectorCanAccess } from 'store/selectors';

interface IProps {
  role?: enRoles | enRoles[];
  inverse?: boolean;
  children?: ReactNode;
}

const PermissionHide = memo<IProps>(({ role, inverse, children }) => {
  const roles = useMemo(() => (Array.isArray(role) ? role : role ? [role] : []), [role]);
  const canAccess = useRecoilValue(selectorCanAccess(roles));

  const shouldRender = inverse ? !canAccess : canAccess;

  return <>{shouldRender && children}</>;
});

export default PermissionHide;

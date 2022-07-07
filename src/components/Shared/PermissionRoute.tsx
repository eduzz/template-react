import { memo } from 'react';

import { useSelector } from 'react-redux';

import usePromiseEffect from '@eduzz/houston-hooks/usePromiseEffect';

import authService from '@/services/auth';
import { selectorIsAuthenticated } from '@/store/selectors';

interface IProps {
  children: React.ReactNode;
}

const PermissionRoute = memo<IProps>(({ children }) => {
  const isAuthenticated = useSelector(selectorIsAuthenticated);

  usePromiseEffect(async () => {
    if (isAuthenticated || isAuthenticated === undefined) return;
    await authService.login();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
});

export default PermissionRoute;

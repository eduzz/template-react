import { useEffect } from 'react';

import { useAppLoader } from '@eduzz/ui-app-loader';
import { usePromiseRefresh } from '@eduzz/ui-hooks-promises';

import useAuthStore from '@/stores/auth';

import { initAccounts } from './service';

interface IProps {
  children: React.ReactNode;
}

const AuthRequired: React.FC<IProps> = ({ children }) => {
  const isAutheticated = useAuthStore(state => state.isAuthenticated());
  const appLoader = useAppLoader();

  const [, error, , refresh] = usePromiseRefresh(async () => {
    if (isAutheticated) return;
    await initAccounts();
  }, [isAutheticated]);

  const shouldRender = isAutheticated;

  useEffect(() => {
    if (isAutheticated) {
      appLoader.hide();
      return;
    }

    appLoader.show();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutheticated]);

  useEffect(() => {
    if (!error) return;
    appLoader.error(error, refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, refresh]);

  return <>{shouldRender && <>{children}</>}</>;
};

export default AuthRequired;

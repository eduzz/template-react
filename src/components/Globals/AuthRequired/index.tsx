import { useContext, useEffect } from 'react';

import { usePromiseRefresh } from '@eduzz/ui-hooks-promises';

import useAuthStore from '@/stores/auth';

import { initAccounts } from './service';
import AppLoaderContext from '../AppLoader/context';

interface IProps {
  children: React.ReactNode;
}

const AuthRequired: React.FC<IProps> = ({ children }) => {
  const isAutheticated = useAuthStore(state => state.isAuthenticated());

  const appLoaderContext = useContext(AppLoaderContext);

  const [, error, , refresh] = usePromiseRefresh(async () => {
    if (isAutheticated) return;
    await initAccounts();
  }, [isAutheticated]);

  const shouldRender = isAutheticated;

  useEffect(() => {
    if (isAutheticated) {
      appLoaderContext.hide();
      return;
    }

    appLoaderContext.show();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutheticated]);

  useEffect(() => {
    if (!error) return;
    appLoaderContext.error(error, refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, refresh]);

  return <>{shouldRender && <>{children}</>}</>;
};

export default AuthRequired;

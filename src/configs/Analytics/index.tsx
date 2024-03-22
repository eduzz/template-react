import { useEffect } from 'react';

import useAuthStore from '@/stores/auth';

import { setUser } from './service';

const Analytics = () => {
  const currentUser = useAuthStore(state => state.currentUser());

  useEffect(() => {
    if (!currentUser) return;
    setUser(currentUser);
  }, [currentUser]);

  return <></>;
};

export default Analytics;

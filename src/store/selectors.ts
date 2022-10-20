import { createSelector } from 'reselect';

import { RootState } from '@/store';

export const selectorIsAuthenticated = createSelector(
  (state: RootState) => state.authToken.value,
  token => !!token
);

export const selectorUser = createSelector(
  (state: RootState) => state.authToken.value,
  token => token
);

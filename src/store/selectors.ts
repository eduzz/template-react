import { createSelector } from 'reselect';

import decodeJWTToken from '@/helpers/jwt';
import { accessTokenDecodedSchema } from '@/schemas/accessToken';
import { RootState } from '@/store';

export const selectorIsAuthenticated = createSelector(
  (state: RootState) => state.authToken.value,
  token => !!token
);

export const selectorUser = createSelector(
  (state: RootState) => state.authToken.value,
  token => (token ? accessTokenDecodedSchema.parse(decodeJWTToken(token)) : null)
);

import decodeJWTToken from 'helpers/jwt';
import { enRoles } from 'interfaces/models/user';
import IUserToken from 'interfaces/tokens/userToken';
import { createSelector } from 'reselect';
import { RootState } from 'store';

export const selectorIsAuthenticated = createSelector(
  (state: RootState) => state.authToken.value,
  token => !!token
);

export const selectorUser = createSelector(
  (state: RootState) => state.authToken.value,
  token => (token ? decodeJWTToken<IUserToken>(token) : null)
);

export const selectorCanAccess = createSelector(
  selectorUser,
  (_: never, roles: enRoles[]) => roles,
  (user, roles) => {
    if (!user) return false;

    if (!roles || roles.length === 0) return true;
    if (user.roles.includes('sysAdmin') || user.roles.includes('admin')) return true;

    return roles.some(r => user.roles.includes(r));
  }
);

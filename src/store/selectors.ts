import decodeJWTToken from 'helpers/jwt';
import { enRoles } from 'interfaces/models/user';
import IUserToken from 'interfaces/tokens/userToken';
import { selector, selectorFamily } from 'recoil';

import { atomAuthToken } from './atoms';

export const selectorIsAuthenticated = selector({
  key: 'isAuthenticated',
  get: ({ get }) => {
    const authToken = get(atomAuthToken);

    if (authToken === null) return null;
    return !!authToken;
  }
});

export const selectorUser = selector({
  key: 'user',
  get: ({ get }) => {
    const token = get(atomAuthToken);
    return token ? decodeJWTToken<IUserToken>(token) : null;
  }
});

export const selectorCanAccess = selectorFamily({
  key: 'canAccess',
  get: (roles: enRoles[]) => {
    return ({ get }) => {
      const user = get(selectorUser);
      if (!user) return false;

      if (!roles || roles.length === 0) return true;
      if (user.roles.includes('sysAdmin') || user.roles.includes('admin')) return true;

      return roles.some(r => user.roles.includes(r));
    };
  }
});

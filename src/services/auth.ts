import apiService from './api';
import cacheService from './cache';

import { accessTokenSchema as accessTokenSchema } from '@/schemas/accessToken';
import { ACCOUNTS_ENV, ACCOUNTS_PARTNER_ID } from '@/settings';
import { store } from '@/store';
import { authTokenSlice } from '@/store/slices/authToken';

declare global {
  interface Window {
    Eduzz: {
      Accounts?: any;
    };
  }
}

export class AuthService {
  public async login() {
    const accountsToken = await new Promise<string>((resolve, reject) => {
      window.Eduzz.Accounts.login(ACCOUNTS_PARTNER_ID, {
        env: ACCOUNTS_ENV
      }).subscribe({
        next: (token: string) => resolve(token),
        error: (err: any) => reject(err)
      });
    });

    this.cleanAccountsUrl();

    const { token } = await apiService.post('/auth/validate', { token: accountsToken }, accessTokenSchema);
    store.dispatch(authTokenSlice.actions.set(token));
  }
  public async logout(): Promise<void> {
    store.dispatch(authTokenSlice.actions.clear());
    await cacheService.clear();
  }

  private cleanAccountsUrl() {
    const params = new URLSearchParams(new URL(window.location.href).search.slice(1));
    params.delete('accounts_token');
    params.delete('accounts_login_token');

    const newParams = params.toString() ? `?${params.toString()}` : '';
    window.history.pushState(null, '', `${window.location.origin}${window.location.pathname}${newParams}`);
  }
}
const authService = new AuthService();
export default authService;

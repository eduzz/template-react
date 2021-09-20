import { store } from 'store';
import { authTokenSlice } from 'store/slices/authToken';

import apiService from './api';
import cacheService from './cache';

export class AuthService {
  public async login(email: string, password: string): Promise<void> {
    const { token } = await apiService.post('/login', { email, password });
    store.dispatch(authTokenSlice.actions.set(token));
  }

  public async logout(): Promise<void> {
    store.dispatch(authTokenSlice.actions.clear());
    await cacheService.clear();
  }

  public async sendResetPassword(email: string): Promise<void> {
    return apiService.post('/auth/send-reset', { email });
  }

  public async resetPassword(token: string, password: string): Promise<void> {
    return apiService.post('/auth/reset-password', { token, password });
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiService.post('/auth/change-password', { currentPassword, newPassword });
  }
}

const authService = new AuthService();
export default authService;

import { AtomServiceAdapter } from 'store/serviceAdapter';

import apiService from './api';
import cacheService from './cache';
import storageService from './storage';

export class AuthService {
  public atoms = {
    authToken: new AtomServiceAdapter<string>()
  };

  constructor() {
    this.atoms.authToken.set(storageService.get<string>('auth-token'));
    this.atoms.authToken.watch(newToken => {
      if (newToken) {
        storageService.set('auth-token', newToken);
        return;
      }

      storageService.remove('auth-token');
    });
  }

  public async login(email: string, password: string): Promise<void> {
    const { token } = await apiService.post('/login', { email, password });
    this.atoms.authToken.set(token);
  }

  public async logout(): Promise<void> {
    this.atoms.authToken.set(null);
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

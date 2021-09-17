import { AtomServiceAdapter } from 'store/serviceAdapter';

import apiService, { ApiService } from './api';
import cacheService, { CacheService } from './cache';
import storageService, { StorageService } from './storage';

export class AuthService {
  public atomAuthTokenAdapter: AtomServiceAdapter<string>;

  constructor(private api: ApiService, private storageService: StorageService, private cacheService: CacheService) {
    this.atomAuthTokenAdapter = new AtomServiceAdapter(({ setSelf, onSet }) => {
      setSelf(this.storageService.get<string>('auth-token'));

      onSet(newToken => {
        if (newToken) {
          this.storageService.set('auth-token', newToken);
          return;
        }

        this.storageService.remove('auth-token');
      });
    });
  }

  public async login(email: string, password: string): Promise<void> {
    const { token } = await this.api.post('/login', { email, password });
    this.atomAuthTokenAdapter.setSelf(token);
  }

  public async logout(): Promise<void> {
    this.atomAuthTokenAdapter.setSelf(null);
    await this.cacheService.clear();
  }

  public async sendResetPassword(email: string): Promise<void> {
    return this.api.post('/auth/send-reset', { email });
  }

  public async resetPassword(token: string, password: string): Promise<void> {
    return this.api.post('/auth/reset-password', { token, password });
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.api.post('/auth/change-password', { currentPassword, newPassword });
  }
}

const authService = new AuthService(apiService, storageService, cacheService);
export default authService;

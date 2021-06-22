import IUserToken from 'interfaces/tokens/userToken';

import apiService, { ApiService } from './api';
import cacheService, { CacheService } from './cache';
import storageService, { StorageService } from './storage';

export class AuthService {
  private token: string;
  private user: IUserToken;

  constructor(private api: ApiService, private storageService: StorageService, private cacheService: CacheService) {
    this.setToken(this.storageService.get<string>('auth-token'));
  }

  public getTokenUser(): IUserToken {
    return this.user;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public async login(email: string, password: string): Promise<void> {
    const { token } = await this.api.post('/login', { email, password });
    this.setToken(token);
  }

  public async logout(): Promise<void> {
    this.setToken(null);
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

  public canAccess(...roles: string[]): boolean {
    if (!this.user) return false;

    if (!roles || roles.length === 0) return true;
    if (this.user.roles.includes('sysAdmin') || this.user.roles.includes('admin')) return true;

    return roles.some(r => this.user.roles.includes(r));
  }

  private setToken(token: string) {
    this.token = token;
    this.api.setBearerToken(token);

    if (token) {
      this.user = this.decodeToken(token);
      this.storageService.set('auth-token', token);
      return;
    }

    this.user = null;
    this.storageService.remove('auth-token');
  }

  private decodeToken(token: string): IUserToken {
    try {
      const data = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;

      return currentTime > data.exp ? null : data;
    } catch (err) {
      return null;
    }
  }
}

const authService = new AuthService(apiService, storageService, cacheService);
export default authService;

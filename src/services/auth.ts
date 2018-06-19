import { IUserToken } from 'interfaces/userToken';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService, { ApiService } from './api';
import tokenService, { TokenService } from './token';

export class AuthService {
  private openLogin$: rxjs.BehaviorSubject<boolean>;
  private openChangePassword$: rxjs.BehaviorSubject<boolean>;

  constructor(
    private api: ApiService,
    private tokenService: TokenService
  ) {
    this.openLogin$ = new rxjs.BehaviorSubject(false);
    this.openChangePassword$ = new rxjs.BehaviorSubject(false);
  }

  public openLogin(): void {
    this.openLogin$.next(true);
  }

  public shouldOpenLogin(): rxjs.Observable<boolean> {
    return this.openLogin$.asObservable();
  }

  public login(username: string, password: string): rxjs.Observable<string> {
    return this.api.post('/oauth/token', { username, password }).pipe(
      rxjsOperators.map(({ data }) => data.token),
      rxjsOperators.switchMap(token => this.tokenService.setToken(token)),
      rxjsOperators.tap(() => this.openLogin$.next(false))
    );
  }

  public logout(): rxjs.Observable<void> {
    return this.tokenService.clearToken();
  }

  public sendResetPassword(email: string): rxjs.Observable<void> {
    return this.api.post('/auth/send-reset', { email }).pipe(
      rxjsOperators.map(() => null)
    );
  }

  public resetPassword(token: string, password: string): rxjs.Observable<void> {
    return this.api.post('/auth/reset-password', { token, password }).pipe(
      rxjsOperators.map(() => null)
    );
  }

  public openChangePassword(): void {
    this.openChangePassword$.next(true);
  }

  public closeChangePassword(): void {
    this.openChangePassword$.next(false);
  }

  public shouldOpenChangePassword(): rxjs.Observable<boolean> {
    return this.openChangePassword$.asObservable();
  }

  public changePassword(currentPassword: string, newPassword: string): rxjs.Observable<void> {
    return this.api.post('/auth/change-password', { currentPassword, newPassword }).pipe(
      rxjsOperators.map(() => null)
    );
  }

  public getUser(): rxjs.Observable<IUserToken> {
    return this.tokenService.getToken().pipe(
      rxjsOperators.map(token => {
        if (!token) return null;
        return this.tokenService.decode<IUserToken>(token);
      })
    );
  }

  public isAuthenticated(): rxjs.Observable<boolean> {
    return this.tokenService.getToken().pipe(rxjsOperators.map(token => !!token));
  }
}

const authService = new AuthService(apiService, tokenService);
export default authService;

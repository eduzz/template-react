import { DeepReadonly } from 'helpers/immutable';
import { IUserToken } from 'interfaces/userToken';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService, { ApiService } from './api';
import tokenService, { TokenService } from './token';

export class AuthService {
  private user$: rxjs.Observable<DeepReadonly<IUserToken>>;
  private openLogin$: rxjs.BehaviorSubject<boolean>;
  private openChangePassword$: rxjs.BehaviorSubject<boolean>;

  constructor(
    private api: ApiService,
    private tokenService: TokenService
  ) {
    this.openLogin$ = new rxjs.BehaviorSubject(false);
    this.openChangePassword$ = new rxjs.BehaviorSubject(false);

    this.user$ = this.tokenService.getToken().pipe(
      rxjsOperators.map(token => {
        if (!token) return null;

        const user = this.tokenService.decode<IUserToken>(token);
        if (!user) return null;

        user.canAccess = () => {
          // IMPLEMENT HERE YOUR LOGIC
          return true;
        };

        return user;
      }),
      rxjsOperators.catchError(() => {
        return rxjs.of(null);
      }),
      rxjsOperators.shareReplay(1)
    );
  }

  public openLogin(): void {
    this.openLogin$.next(true);
  }

  public shouldOpenLogin(): rxjs.Observable<boolean> {
    return this.openLogin$.asObservable();
  }

  public login(email: string, password: string): rxjs.Observable<void> {
    return this.api.post('/auth/login', { email, password }).pipe(
      rxjsOperators.switchMap(({ token }) => tokenService.setToken(token)),
      rxjsOperators.tap(() => this.openLogin$.next(false)),
      rxjsOperators.map(() => null)
    );
  }

  public logout(): rxjs.Observable<void> {
    return this.tokenService.clearToken();
  }

  public sendResetPassword(email: string): rxjs.Observable<void> {
    return this.api.post('/auth/send-reset', { email });
  }

  public resetPassword(token: string, password: string): rxjs.Observable<void> {
    return this.api.post('/auth/reset-password', { token, password });
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
    return this.api.post('/auth/change-password', { currentPassword, newPassword });
  }

  public getUser(): rxjs.Observable<DeepReadonly<IUserToken>> {
    return this.user$;
  }

  public isAuthenticated(): rxjs.Observable<boolean> {
    return this.tokenService.getToken().pipe(rxjsOperators.map(token => !!token));
  }
}

const authService = new AuthService(apiService, tokenService);
export default authService;

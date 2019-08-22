import IUserToken from 'interfaces/tokens/userToken';
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs-operators';

import apiService, { ApiService } from './api';
import cacheService from './cache';
import tokenService, { TokenService } from './token';

export class AuthService {
  private user$: Rx.Observable<IUserToken>;
  private openLogin$: Rx.BehaviorSubject<boolean>;
  private openChangePassword$: Rx.BehaviorSubject<boolean>;

  constructor(private api: ApiService, private tokenService: TokenService) {
    this.openLogin$ = new Rx.BehaviorSubject(false);
    this.openChangePassword$ = new Rx.BehaviorSubject(false);

    this.user$ = this.tokenService.getToken().pipe(
      RxOp.map(token => {
        if (!token) return null;

        const user = this.tokenService.decode<IUserToken>(token);
        if (!user) return null;

        user.fullName = `${user.firstName} ${user.lastName}`;
        return user;
      }),
      RxOp.catchError(() => Rx.of(null)),
      RxOp.shareReplay(1)
    );

    this.getUser()
      .pipe(
        RxOp.distinctUntilChanged((a, b) => (a || ({} as IUserToken)).id !== (b || ({} as IUserToken)).id),
        RxOp.switchMap(() => cacheService.clear()),
        RxOp.logError()
      )
      .subscribe();
  }

  public openLogin(): void {
    this.openLogin$.next(true);
  }

  public shouldOpenLogin(): Rx.Observable<boolean> {
    return this.openLogin$.asObservable();
  }

  public login(email: string, password: string): Rx.Observable<void> {
    return this.api.post('/auth/login', { email, password }).pipe(RxOp.tap(() => this.openLogin$.next(false)));
  }

  public logout(): Rx.Observable<void> {
    return this.tokenService.clearToken();
  }

  public sendResetPassword(email: string): Rx.Observable<void> {
    return this.api.post('/auth/send-reset', { email });
  }

  public resetPassword(token: string, password: string): Rx.Observable<void> {
    return this.api.post('/auth/reset-password', { token, password });
  }

  public openChangePassword(): void {
    this.openChangePassword$.next(true);
  }

  public closeChangePassword(): void {
    this.openChangePassword$.next(false);
  }

  public shouldOpenChangePassword(): Rx.Observable<boolean> {
    return this.openChangePassword$.asObservable();
  }

  public changePassword(currentPassword: string, newPassword: string): Rx.Observable<void> {
    return this.api.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
  }

  public getUser(): Rx.Observable<IUserToken> {
    return this.user$;
  }

  public canAccess(...roles: string[]): Rx.Observable<boolean> {
    return this.getUser().pipe(
      RxOp.map(user => {
        if (!user) return false;

        if (!roles || roles.length === 0) return true;
        if (user.roles.includes('sysAdmin') || user.roles.includes('admin')) return true;

        return roles.some(r => user.roles.includes(r));
      })
    );
  }

  public isAuthenticated(): Rx.Observable<boolean> {
    return this.getUser().pipe(RxOp.map(user => !!user));
  }
}

const authService = new AuthService(apiService, tokenService);
export default authService;

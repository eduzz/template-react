import IUserToken, { enUserType } from 'interfaces/tokens/userToken';
import * as Rx from 'rxjs';
import RxOp from 'rxjs-operators';
import UAParser from 'ua-parser-js';
import { v4 } from 'uuid';

import apiService from './api';
import storageService from './storage';
import tokenService from './token';

export class AuthService {
  private user$: Rx.Observable<IUserToken>;
  private openLogin$: Rx.BehaviorSubject<boolean>;
  private openChangePassword$: Rx.BehaviorSubject<boolean>;

  constructor() {
    this.openLogin$ = new Rx.BehaviorSubject(false);
    this.openChangePassword$ = new Rx.BehaviorSubject(false);

    this.user$ = tokenService.getAccessToken().pipe(
      RxOp.map(token => {
        if (!token) return null;

        const user = tokenService.decode<IUserToken>(token, true);
        if (!user || user.type !== enUserType.PRODUCER) return null;

        user.firstName = (user.name || '').split(' ')[0];
        return user;
      }),
      RxOp.catchError(err => {
        return Rx.of(null);
      }),
      RxOp.shareReplay(1)
    );
  }

  public openLogin(): void {
    this.openLogin$.next(true);
  }

  public shouldOpenLogin(): Rx.Observable<boolean> {
    return this.openLogin$.asObservable();
  }

  public login(username: string, password: string): Rx.Observable<void> {
    return this.getDevideInfo().pipe(
      RxOp.switchMap(deviceInfo => apiService.post('/oauth/token', { username, password, ...deviceInfo, type: 'producer' })),
      RxOp.tap(() => this.openLogin$.next(false)),
      RxOp.switchMap(response => tokenService.setTokens(response.data)),
      RxOp.map(() => null)
    );
  }

  public loginAs(token: string): Rx.Observable<void> {
    return this.getDevideInfo().pipe(
      RxOp.switchMap(deviceInfo => apiService.post('/oauth/token/login-as', { token, ...deviceInfo })),
      RxOp.tap(() => this.openLogin$.next(false)),
      RxOp.switchMap(response => tokenService.setTokens(response.data)),
      RxOp.map(() => null)
    );
  }

  public logout(): Rx.Observable<void> {
    return tokenService.clearToken();
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

  public getUser(): Rx.Observable<IUserToken> {
    return this.user$;
  }

  public canAccess(): Rx.Observable<boolean> {
    return this.getUser().pipe(
      RxOp.map(user => {
        if (!user) return false;
        return true;
      })
    );
  }

  public isAuthenticated(): Rx.Observable<boolean> {
    return this.getUser().pipe(RxOp.map(user => !!user));
  }

  private getDevideInfo(): Rx.Observable<{ device_id: string, device_name: string }> {
    return storageService.get<string>('deviceId').pipe(
      RxOp.switchMap(deviceId => {
        if (deviceId) return Rx.of(deviceId);
        return storageService.set('deviceId', v4());
      }),
      RxOp.map(deviceId => {
        const parser = new UAParser();
        const { browser: { name: browser }, os: { name: device } } = parser.getResult();

        return {
          device_id: deviceId,
          device_name: `${browser} - ${device}`
        };
      })
    );
  }

  public getUserInfo() {
    return apiService.get('user/profile').pipe(
      RxOp.map(response => response.data),
    );
  }
}

const authService = new AuthService();
export default authService;

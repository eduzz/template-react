import { DeepReadonly } from 'helpers/immutable';
import { enUserType, IUserToken } from 'interfaces/userToken';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';
import UAParser from 'ua-parser-js';
import { v4 } from 'uuid';

import apiService from './api';
import storageService from './storage';
import tokenService from './token';

export class AuthService {
  private user$: rxjs.Observable<DeepReadonly<IUserToken>>;
  private openLogin$: rxjs.BehaviorSubject<boolean>;
  private openChangePassword$: rxjs.BehaviorSubject<boolean>;

  constructor() {
    this.openLogin$ = new rxjs.BehaviorSubject(false);
    this.openChangePassword$ = new rxjs.BehaviorSubject(false);

    this.user$ = tokenService.getAccessToken().pipe(
      rxjsOperators.map(token => {
        if (!token) return null;

        const user = tokenService.decode<IUserToken>(token, true);
        if (!user || user.type !== enUserType.PRODUCER) return null;

        user.firstName = (user.name || '').split(' ')[0];
        user.canAccess = () => {
          return true;
        };

        return user;
      }),
      rxjsOperators.catchError(err => {
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

  public login(username: string, password: string): rxjs.Observable<void> {
    return this.getDevideInfo().pipe(
      rxjsOperators.switchMap(deviceInfo => apiService.post('/oauth/token', { username, password, ...deviceInfo, type: 'producer' })),
      rxjsOperators.tap(() => this.openLogin$.next(false)),
      rxjsOperators.switchMap(response => tokenService.setTokens(response.data)),
      rxjsOperators.map(() => null)
    );
  }

  public logout(): rxjs.Observable<void> {
    return tokenService.clearToken();
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

  public getUser(): rxjs.Observable<DeepReadonly<IUserToken>> {
    return this.user$;
  }

  public canAccess(): rxjs.Observable<boolean> {
    return this.getUser().pipe(
      rxjsOperators.map(user => {
        if (!user) return false;
        return true;
      })
    );
  }

  public isAuthenticated(): rxjs.Observable<boolean> {
    return tokenService.getAccessToken().pipe(rxjsOperators.map(token => !!token));
  }

  private getDevideInfo(): rxjs.Observable<{ device_id: string, device_name: string }> {
    return storageService.get<string>('deviceId').pipe(
      rxjsOperators.switchMap(deviceId => {
        if (deviceId) return rxjs.of(deviceId);
        return storageService.set('deviceId', v4());
      }),
      rxjsOperators.map(deviceId => {
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
      rxjsOperators.map(response => response.data),
    );
  }
}

const authService = new AuthService();
export default authService;

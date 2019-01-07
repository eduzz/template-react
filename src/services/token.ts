import redirectV2 from 'helpers/redirectV2';
import { Observable, ReplaySubject } from 'rxjs';
import * as RxOp from 'rxjs-operators';

import storageService from './storage';

interface ITokens {
  legacyLogin: boolean;
  refresh_token: string;
  token: string;
}

export class TokenService {
  private tokens$: ReplaySubject<ITokens>;

  constructor() {
    this.tokens$ = new ReplaySubject(1);

    storageService.get('authToken').pipe(
      RxOp.first(),
      RxOp.logError()
    ).subscribe(token => this.tokens$.next(token));
  }

  public getAccessToken(): Observable<string> {
    return this.tokens$.pipe(
      RxOp.map(tokens => (tokens || { token: null }).token),
      RxOp.distinctUntilChanged()
    );
  }

  public getTokens(): Observable<ITokens> {
    return this.tokens$.asObservable();
  }

  public setTokens(tokens: Pick<ITokens, Exclude<keyof ITokens, 'legacyLogin'>>, legacyLogin: boolean = false): Observable<ITokens> {

    const date = new Date();
    date.setTime(date.getTime() + (1000 * 60 * 60 * 24));
    document.cookie = `userSession=${JSON.stringify(tokens)}; domain=.nutror.com; expires=${date.toUTCString()}`;

    return storageService.set<ITokens>('authToken', { legacyLogin, ...tokens }).pipe(
      RxOp.tap(tokens => this.tokens$.next(tokens))
    );
  }

  public setAccessToken(token: string): Observable<ITokens> {
    return this.tokens$.pipe(
      RxOp.switchMap(({ legacyLogin, refresh_token }) => {
        return storageService.set<ITokens>('authToken', { legacyLogin, token, refresh_token });
      })
    );
  }
  public clearToken(): Observable<void> {
    let legacyLogin = false;

    return this.tokens$.pipe(
      RxOp.first(),
      RxOp.filter(tokens => !!tokens),
      RxOp.tap(tokens => legacyLogin = tokens.legacyLogin),
      RxOp.switchMap(() => storageService.set('authToken', null)),
      RxOp.filter(() => {
        if (legacyLogin) redirectV2('/user/logout');
        return !legacyLogin;
      }),
      RxOp.tap(() => this.tokens$.next(null)),
      RxOp.map(() => null)
    );
  }

  public decode<T>(token: string, allowExpirated: boolean = false): T {
    try {
      const data = JSON.parse(atob(token.split('.')[1]));

      if (allowExpirated) return data;

      const currentTime = Date.now() / 1000;
      return currentTime > data.exp ? null : data;
    } catch (err) {
      return null;
    }
  }
}

const tokenService = new TokenService();
export default tokenService;
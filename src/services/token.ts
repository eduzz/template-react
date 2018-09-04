import { Observable, ReplaySubject } from 'rxjs';
import * as rxjsOperators from 'rxjs-operators';

import storageService from './storage';

interface ITokens {
  refresh_token: string;
  token: string;
}

export class TokenService {
  private tokens$: ReplaySubject<ITokens>;

  constructor() {
    this.tokens$ = new ReplaySubject(1);

    storageService.get('authToken').pipe(
      rxjsOperators.logError()
    ).subscribe(token => this.tokens$.next(token));
  }

  public getAccessToken(): Observable<string> {
    return this.tokens$.pipe(
      rxjsOperators.map(tokens => (tokens || { token: null }).token),
      rxjsOperators.distinctUntilChanged()
    );
  }

  public getTokens(): Observable<ITokens> {
    return this.tokens$.asObservable();
  }

  public setTokens(tokens: ITokens): Observable<ITokens> {
    return storageService.set('authToken', tokens).pipe(
      rxjsOperators.tap(() => this.tokens$.next(tokens))
    );
  }

  public setAccessToken(token: string): Observable<ITokens> {
    return this.tokens$.pipe(
      rxjsOperators.switchMap(({ refresh_token }) => {
        return storageService.set<ITokens>('authToken', { token, refresh_token });
      })
    );
  }
  public clearToken(): Observable<void> {
    return this.setTokens(null).pipe(rxjsOperators.map(() => null));
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
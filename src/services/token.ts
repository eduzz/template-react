import { Observable, ReplaySubject } from 'rxjs';
import * as rxjsOperators from 'rxjs-operators';

import storageService, { StorageService } from './storage';

interface ITokens {
  refresh_token: string;
  token: string;
}

export class TokenService {
  private tokens$: ReplaySubject<ITokens>;

  constructor(private storageService: StorageService) {
    this.tokens$ = new ReplaySubject(1);

    this.storageService.get('authToken').pipe(
      rxjsOperators.logError()
    ).subscribe(token => this.tokens$.next(token));
  }

  public getAccessToken(): Observable<string> {
    return this.tokens$.pipe(
      rxjsOperators.map(tokens => (tokens || { token: null }).token),
      rxjsOperators.distinctUntilChanged()
    );
  }

  public setTokens(tokens: ITokens): Observable<ITokens> {
    return this.storageService.set('authToken', tokens).pipe(
      rxjsOperators.tap(() => this.tokens$.next(tokens))
    );
  }

  public clearToken(): Observable<void> {
    return this.setTokens(null).pipe(rxjsOperators.map(() => null));
  }

  public decode<T>(token: string): T {
    try {
      const data = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;

      return currentTime > data.exp ? null : data;
    } catch (err) {
      return null;
    }
  }
}

const tokenService = new TokenService(storageService);
export default tokenService;
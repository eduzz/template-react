import { Observable, ReplaySubject } from 'rxjs';
import * as rxjsOperators from 'rxjs-operators';

import storageService, { StorageService } from './storage';

export class TokenService {
  private token$: ReplaySubject<string>;

  constructor(private storageService: StorageService) {
    this.token$ = new ReplaySubject(1);

    this.storageService.get('authToken').pipe(
      rxjsOperators.logError()
    ).subscribe(token => this.token$.next(token));
  }

  public getToken(): Observable<string> {
    return this.token$.pipe(rxjsOperators.distinctUntilChanged());
  }

  public setToken(token: string): Observable<string> {
    return this.storageService.set('authToken', token).pipe(
      rxjsOperators.tap(() => this.token$.next(token))
    );
  }

  public clearToken(): Observable<void> {
    return this.setToken(null).pipe(rxjsOperators.map(() => null));
  }

  public decode<T>(token: string): T {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
      return null;
    }
  }
}

const tokenService = new TokenService(storageService);
export default tokenService;
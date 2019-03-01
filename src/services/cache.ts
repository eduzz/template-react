import dateFnsAddMinutes from 'date-fns/addMinutes';
import dateFnsIsBefore from 'date-fns/isBefore';
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';

import ICache from '../interfaces/cache';
import storageService from './storage';

export class CacheService {
  private change$ = new Rx.Subject<{ key: string, value: ICache }>();
  private memory: { [key: string]: ICache };

  constructor() {
    this.memory = {};
  }

  public getData<T = any>(key: string): Rx.Observable<ICache<T>> {
    if (this.memory[key]) return Rx.of(this.memory[key]);
    return storageService.get('app-cache-' + key);
  }

  public watchData<T>(key: string): Rx.Observable<ICache<T>> {
    return this.getData<T>(key).pipe(
      RxOp.concat(this.change$.pipe(
        RxOp.filter(data => data.key === key),
        RxOp.map(data => data.value)
      )),
      RxOp.debounceTime(100)
    );
  }

  public removeData(key: string) {
    return storageService.set('app-cache-' + key, null).pipe(
      RxOp.tap(() => this.memory[key] = null),
      RxOp.tap(() => this.change$.next({ key, value: null }))
    );
  }

  public saveData<T>(
    key: string,
    data: T,
    options: { persist: boolean, expirationMinutes: number } = { persist: false, expirationMinutes: 5 }
  ): Rx.Observable<ICache<T>> {
    const cache: ICache<T> = {
      createdAt: new Date(),
      expirationDate: dateFnsAddMinutes(new Date(), options.expirationMinutes),
      data
    };

    if (options.persist) {
      return storageService.set('app-cache-' + key, cache).pipe(
        RxOp.tap(() => this.change$.next({ key, value: cache }))
      );
    }

    return Rx.of(true).pipe(
      RxOp.map(() => {
        this.memory[key] = cache;
        this.change$.next({ key, value: cache });
        return cache;
      })
    );
  }

  public isExpirated(cache: ICache): boolean {
    return dateFnsIsBefore(cache.expirationDate, new Date());
  }

  public clear(): Rx.Observable<void> {
    return storageService.clear(/^app-cache-/gi).pipe(
      RxOp.tap(() => this.memory = {})
    );
  }

}

const cacheService = new CacheService();
export default cacheService;
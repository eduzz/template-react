import { DateTime } from 'luxon';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';

import { ICache } from '../interfaces/cache';
import storageService, { StorageService } from './storage';

export class CacheService {
  private change$ = new rxjs.Subject<{ key: string, value: ICache }>();
  private memory: { [key: string]: ICache };

  constructor(private storageService: StorageService) {
    this.memory = {};
  }

  public getData<T = any>(key: string): rxjs.Observable<ICache<T>> {
    if (this.memory[key]) return rxjs.of(this.memory[key]);
    return this.storageService.get('app-cache-' + key);
  }

  public watchData<T>(key: string): rxjs.Observable<ICache<T>> {
    return this.getData<T>(key).pipe(
      rxjsOperators.concat(this.change$.pipe(
        rxjsOperators.filter(data => data.key === key),
        rxjsOperators.map(data => data.value)
      )),
      rxjsOperators.debounceTime(100)
    );
  }

  public removeData(key: string) {
    return this.storageService.set('app-cache-' + key, null).pipe(
      rxjsOperators.tap(() => this.memory[key] = null)
    );
  }

  public saveData<T>(
    key: string,
    data: T,
    options: { persist: boolean, expirationMinutes: number } = { persist: false, expirationMinutes: 5 }
  ): rxjs.Observable<ICache<T>> {
    const cache: ICache<T> = {
      createdAt: new Date(),
      expirationDate: DateTime.local().plus({ minutes: options.expirationMinutes }).toJSDate(),
      data
    };

    if (options.persist) {
      return this.storageService.set('app-cache-' + key, cache).pipe(
        rxjsOperators.tap(() => this.change$.next({ key, value: cache }))
      );
    }

    return rxjs.of(true).pipe(
      rxjsOperators.map(() => {
        this.memory[key] = cache;
        this.change$.next({ key, value: cache });
        return cache;
      })
    );
  }

  public isExpirated(cache: ICache): boolean {
    if (cache.expirationDate) {
      return DateTime.fromJSDate(cache.expirationDate) < DateTime.local();
    }

    const difference = Date.now() - new Date(cache.createdAt).getTime();
    return (difference / 1000 / 60) > 5; //5 minutes
  }

  public clear(): rxjs.Observable<void> {
    return this.storageService.clear(/^app-cache-/gi).pipe(
      rxjsOperators.tap(() => this.memory = {})
    );
  }

}

const cacheService = new CacheService(storageService);
export default cacheService;
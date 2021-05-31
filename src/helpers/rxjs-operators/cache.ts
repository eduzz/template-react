import { Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import cacheService from 'services/cache';

import { tapSubscribe } from './tapSubscrible';

const peddingCache: { [key: string]: Observable<any> } = {};

export interface ICacheService {
  watchData<T>(key: string): Observable<ICacheResult<T>>;
  isExpirated(cache: ICacheResult<any>): boolean;
  saveData<T>(key: string, cache: T, options: IOptions): Observable<ICacheResult<T>>;
  removeData(key: string): Observable<any>;
}

export interface IOptions {
  refresh: boolean;
  persist: boolean;
  expirationMinutes: number;
}

export interface ICacheResult<T = any> {
  data: T;
}

export function cacheClean<T>(key: string) {
  return (source: Observable<T>) => source.pipe(tapSubscribe(() => cacheService.removeData(key)));
}

export function cacheCleanAll<T>() {
  return (source: Observable<T>) => source.pipe(tapSubscribe(() => cacheService.clear()));
}

export default function cache<T>(key: string, opt?: Partial<IOptions>) {
  const options: IOptions = {
    refresh: false,
    persist: false,
    expirationMinutes: 5,
    ...(opt ?? {})
  };

  return (source: Observable<T>) => {
    return new Observable<T>(subscriber => {
      let useCache = !options.refresh;

      if (!peddingCache[key]) {
        peddingCache[key] = cacheService.watchData<T>(key).pipe(
          map(cache => (useCache ? cache : null)),
          switchMap(cache => {
            if (cache && !cacheService.isExpirated(cache)) {
              return of(cache.data);
            }

            return source.pipe(
              switchMap(data => {
                useCache = true;
                return cacheService.saveData<T>(key, data, options);
              }),
              filter(() => false)
            );
          }),
          tap(() => setTimeout(() => (peddingCache[key] = null), 500)),
          shareReplay(1)
        );
      }

      const subscription = peddingCache[key].subscribe(subscriber);
      return () => subscription.unsubscribe();
    });
  };
}

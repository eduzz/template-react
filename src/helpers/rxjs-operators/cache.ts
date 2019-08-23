import { Observable, of, Operator, Subscriber, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';

import { tapSubscribe } from './tapSubscrible';

let globalCacheService: ICacheService;

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
  updating?: boolean;
  data: T;
}

export function setup(cacheService: ICacheService) {
  globalCacheService = cacheService;
}

export function cacheClean<T>(key: string) {
  return (source: Observable<T>) => source.pipe(tapSubscribe(() => globalCacheService.removeData(key)));
}

export default function cache<T>(key: string, options: Partial<IOptions> = {}) {
  const defaultOptions: IOptions = {
    refresh: false,
    persist: true,
    expirationMinutes: 5
  };

  return (source: Observable<T>) => source.lift(new CacheOperator<T>(key, { ...defaultOptions, ...options }));
}

class CacheOperator<T> implements Operator<T, ICacheResult<T>> {
  constructor(private key: string, private options: IOptions) {}

  public call(subscriber: Subscriber<ICacheResult<T>>, source: Observable<T>): Subscription {
    let useCache = !this.options.refresh;

    return globalCacheService
      .watchData<T>(this.key)
      .pipe(
        map(cache => (useCache ? cache : null)),
        switchMap(cache => {
          if (cache && !globalCacheService.isExpirated(cache)) {
            return of({ updating: false, data: cache.data });
          }

          return source.pipe(
            switchMap(data => {
              useCache = true;
              return globalCacheService.saveData<T>(this.key, data, this.options);
            }),
            filter(() => false),
            !cache ? tap() : startWith({ updating: true, data: cache.data })
          );
        })
      )
      .subscribe(subscriber);
  }
}

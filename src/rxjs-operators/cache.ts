import { ICache } from 'interfaces/cache';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';
import cacheService from 'services/cache';
import logService from 'services/log';

interface IOptions {
  refresh: boolean;
  persist: boolean;
  expirationMinutes: number;
}

export function cache<T>(key: string, options: Partial<IOptions> = {}) {
  const defaultOptions: IOptions = {
    refresh: false,
    persist: false,
    expirationMinutes: 5
  };

  return (source: rxjs.Observable<T>) => source.lift<T>(new CacheOperator(key, { ...defaultOptions, ...options }));
}

class CacheOperator<T> implements rxjs.Operator<T, T> {
  constructor(
    private key: string,
    private options: IOptions
  ) { }

  public call(subscriber: rxjs.Subscriber<any>, source: rxjs.Observable<any>): rxjs.Subscription {
    if (this.options.refresh) {
      return source.pipe(
        rxjsOperators.tap(data => cacheService.saveData(this.key, data, this.options))
      ).subscribe(subscriber);
    }

    let currentCache: ICache;
    return cacheService.getData(this.key).pipe(
      rxjsOperators.switchMap(cache => {
        currentCache = cache;
        if (cache && !cacheService.isExpirated(cache)) {
          return rxjs.of(cache.data);
        }

        return !cache ? source : source.pipe(rxjsOperators.startWith(cache.data));
      }),
      rxjsOperators.switchMap(data => {
        if (currentCache && currentCache.data === data) {
          logService.breadcrumb('Cache', 'manual', data);
          return rxjs.of(data);
        }

        logService.breadcrumb('Cache Set', 'manual', data);
        return cacheService.saveData(this.key, data, this.options).pipe(
          rxjsOperators.map(() => data)
        );
      })
    ).subscribe(subscriber);
  }
}
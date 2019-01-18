import ICache from 'interfaces/cache';
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';
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

  return (source: Rx.Observable<T>) => source.lift<T>(new CacheOperator(key, { ...defaultOptions, ...options }));
}

class CacheOperator<T> implements Rx.Operator<T, T> {
  constructor(
    private key: string,
    private options: IOptions
  ) { }

  public call(subscriber: Rx.Subscriber<any>, source: Rx.Observable<any>): Rx.Subscription {
    const start = this.options.refresh ?
      cacheService.removeData(this.key) : Rx.of(true);

    let currentCache: ICache;
    return start.pipe(
      RxOp.switchMap(() => cacheService.watchData(this.key)),
      RxOp.switchMap(cache => {
        currentCache = cache;

        if (cache && !cacheService.isExpirated(cache)) {
          return Rx.of(cache.data);
        }

        return !cache ? source : source.pipe(RxOp.startWith(cache.data));
      }),
      RxOp.switchMap(data => {
        if (currentCache && currentCache.data === data) {
          logService.breadcrumb('Cache', 'manual', data);
          return Rx.of(data);
        }

        logService.breadcrumb('Cache Set', 'manual', data);
        return cacheService.saveData(this.key, data, this.options).pipe(
          RxOp.filter(() => false)
        );
      })
    ).subscribe(subscriber);
  }
}
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';
import cacheService from 'services/cache';

interface IOptions {
  refresh: boolean;
  persist: boolean;
  expirationMinutes: number;
}

export interface ICacheResult<T = any> {
  cached: boolean;
  updating: boolean;
  data: T;
}

export function cache<T>(key: string, options: Partial<IOptions> = {}) {
  const defaultOptions: IOptions = {
    refresh: false,
    persist: false,
    expirationMinutes: 5
  };

  return (source: Rx.Observable<T>) => source.lift<ICacheResult<T>>(new CacheOperator(key, { ...defaultOptions, ...options }));
}

class CacheOperator<T> implements Rx.Operator<T, T> {
  constructor(
    private key: string,
    private options: IOptions
  ) { }

  public call(subscriber: Rx.Subscriber<any>, source: Rx.Observable<any>): Rx.Subscription {
    const start = this.options.refresh ?
      cacheService.removeData(this.key) : Rx.of(true);

    return start.pipe(
      RxOp.switchMap(() => cacheService.watchData(this.key)),
      RxOp.switchMap(cache => {
        if (cache && !cacheService.isExpirated(cache)) {
          return Rx.of({
            cached: true,
            updating: false,
            data: cache.data
          } as ICacheResult);
        }

        return source.pipe(
          RxOp.map(data => ({
            cached: false,
            updating: true,
            data
          } as ICacheResult)),
          RxOp.switchMap((result: ICacheResult) => {
            if (result.cached) return Rx.of(result);

            return cacheService.saveData(this.key, result.data, this.options).pipe(
              RxOp.map(() => result)
            );
          }),
          RxOp.startWith({
            cached: !!(cache && cache.data),
            updating: true,
            data: cache && cache.data
          } as ICacheResult)
        );
      })
    ).subscribe(subscriber);
  }
}
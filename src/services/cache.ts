import { Observable, Subject, concat, of } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';

import dateFnsAddMinutes from 'date-fns/addMinutes';
import dateFnsIsBefore from 'date-fns/isBefore';
import { apiResponseFormatter } from 'formatters/apiResponse';

export interface ICache<T = any> {
  data: T;
  createdAt: Date;
  expirationDate: Date;
}

export class CacheService {
  private change$ = new Subject<{ key: string; value: ICache }>();
  private memory: { [key: string]: ICache };

  constructor() {
    this.memory = {};
  }

  public getData<T = any>(key: string): Observable<ICache<T>> {
    if (this.memory[key]) return of(this.memory[key]);
    return of(localStorage.getItem('app-cache-' + key)).pipe(
      map(data => (data ? apiResponseFormatter(JSON.parse(data)) : null))
    );
  }

  public watchData<T>(key: string): Observable<ICache<T>> {
    return concat(
      this.getData<T>(key),
      this.change$.pipe(
        filter(data => data.key === key),
        map(data => data.value)
      )
    ).pipe(debounceTime(100));
  }

  public removeData(key: string) {
    return of(true).pipe(
      tap(() => {
        localStorage.removeItem('app-cache-' + key);
        this.memory[key] = null;
        this.change$.next({ key, value: null });
      })
    );
  }

  public saveData<T>(
    key: string,
    data: T,
    options?: { persist: boolean; expirationMinutes: number }
  ): Observable<ICache<T>> {
    const cache: ICache<T> = {
      createdAt: new Date(),
      expirationDate: dateFnsAddMinutes(new Date(), options?.expirationMinutes ?? 5),
      data
    };

    if (options?.persist) {
      return of(cache).pipe(
        tap(() => {
          localStorage.setItem('app-cache-' + key, JSON.stringify(cache));
          this.change$.next({ key, value: cache });
        })
      );
    }

    return of(true).pipe(
      map(() => {
        this.memory[key] = cache;
        this.change$.next({ key, value: cache });
        return cache;
      })
    );
  }

  public isExpirated(cache: ICache): boolean {
    return dateFnsIsBefore(cache.expirationDate, new Date());
  }

  public clear(): Observable<void> {
    return of(true).pipe(
      tap(() => {
        this.memory = {};

        Object.keys(localStorage)
          .filter(key => key.startsWith('app-cache'))
          .forEach(key => localStorage.removeItem(key));
      }),
      map(() => null)
    );
  }
}

const cacheService = new CacheService();
export default cacheService;

import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';

import { apiResponseFormatter } from '../formatters/apiResponse';

export class StorageService {

  public get<T = any>(key: string): Rx.Observable<T> {
    return Rx.of(true).pipe(
      RxOp.map(() => localStorage.getItem(key)),
      RxOp.map(data => data ? apiResponseFormatter(JSON.parse(data)) : null),
      RxOp.catchError(() => Rx.of(null))
    );
  }

  public set<T = any>(key: string, value: T): Rx.Observable<T> {
    return Rx.of(true).pipe(
      RxOp.map(() => localStorage.setItem(key, JSON.stringify(value))),
      RxOp.map(() => value)
    );
  }

  public clear(regexp: RegExp): Rx.Observable<void> {
    return Rx.of(Object.keys(localStorage)).pipe(
      RxOp.map(keys => {
        if (regexp) {
          keys = keys.filter(k => regexp.test(k));
        }

        keys.forEach(k => localStorage.removeItem(k));
      })
    );
  }

}

const storageService = new StorageService();
export default storageService;
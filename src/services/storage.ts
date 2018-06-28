import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';

import { apiResponseFormatter } from '../formatters/apiResponse';

export class StorageService {

  public get<T = any>(key: string): rxjs.Observable<T> {
    return rxjs.of(true).pipe(
      rxjsOperators.map(() => localStorage.getItem(key)),
      rxjsOperators.map(data => data ? apiResponseFormatter(JSON.parse(data)) : null),
      rxjsOperators.catchError(() => rxjs.of(null))
    );
  }

  public set<T = any>(key: string, value: T): rxjs.Observable<T> {
    return rxjs.of(true).pipe(
      rxjsOperators.map(() => localStorage.setItem(key, JSON.stringify(value))),
      rxjsOperators.map(() => value)
    );
  }

  public clear(regexp: RegExp): rxjs.Observable<void> {
    return rxjs.of(Object.keys(localStorage)).pipe(
      rxjsOperators.map(keys => {
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
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import loaderService from 'services/loader';

let counter = 0;

export function loader<T>() {
  return (source: Observable<T>) => {
    return new Observable<T>(subscriber => {
      const ref = `loader-operator-${++counter}-${Date.now()}`;
      loaderService.show(ref);

      const subscription = source.pipe(delay(500)).subscribe({
        next: value => {
          loaderService.hide(ref);
          subscriber.next(value);
        },
        error: err => {
          loaderService.hide(ref);
          subscriber.error(err);
        },
        complete: () => {
          loaderService.hide(ref);
          subscriber.complete();
        }
      });

      return () => subscription.unsubscribe();
    });
  };
}

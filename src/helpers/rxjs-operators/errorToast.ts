import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import Toast from 'components/Shared/Toast';

export default function errorToast<T>() {
  return (source: Observable<T>) => {
    return new Observable(subscriber => {
      const subscription = source.pipe(tap({ error: err => Toast.error(err) })).subscribe(subscriber);
      return () => subscription.unsubscribe();
    });
  };
}

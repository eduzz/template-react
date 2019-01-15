import { Observable } from 'rxjs';
import cacheService from 'services/cache';

import { tapSubscribe } from './tapSubscrible';

export function cacheClean<T>(key: string) {
  return (source: Observable<T>) => source.pipe(
    tapSubscribe(() => cacheService.removeData(key))
  );
}
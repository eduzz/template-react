import moment from 'moment';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';

import { ICache } from '../interfaces/cache';
import storageService, { StorageService } from './storage';

export class CacheService {
  private memory: { [key: string]: ICache };

  constructor(private storageService: StorageService) {
    this.memory = {};
  }

  public getData(key: string): rxjs.Observable<ICache> {
    if (this.memory[key]) return rxjs.of(this.memory[key]);
    return this.storageService.get('church-cache-' + key);
  }

  public saveData<T>(key: string, data: T, options: { persist: boolean, expirationMinutes: number }): rxjs.Observable<ICache<T>> {
    const cache: ICache<T> = {
      createdAt: new Date(),
      expirationDate: moment().add(options.expirationMinutes, 'minutes').toDate(),
      data
    };

    if (options.persist) {
      return this.storageService.set('church-cache-' + key, cache);
    }

    return rxjs.of(true).pipe(
      rxjsOperators.map(() => {
        this.memory[key] = cache;
        return cache;
      })
    );
  }

  public isExpirated(cache: ICache): boolean {
    if (cache.expirationDate) {
      return moment(cache.expirationDate).isBefore(moment());
    }

    const difference = Date.now() - new Date(cache.createdAt).getTime();
    return (difference / 1000 / 60) > 5; //5 minutes
  }

  public clear(): rxjs.Observable<void> {
    return this.storageService.clear(/^app-cache-/gi);
  }

}

const cacheService = new CacheService(storageService);
export default cacheService;
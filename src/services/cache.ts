import dateFnsAddMinutes from 'date-fns/addMinutes';
import dateFnsIsBefore from 'date-fns/isBefore';

import storageService, { StorageService } from './storage';

export interface ICache<T = any> {
  data: T;
  createdAt: Date;
  expirationDate: Date;
}

export interface ICacheWatcher<T> {
  (value: ICache<T>): void;
}

export class CacheService {
  private memory: { [key: string]: ICache };
  private watchers: { [key: string]: ICacheWatcher<any>[] };

  constructor(private storageService: StorageService) {
    this.memory = {};
    this.watchers = {};
  }

  public async get<T = any>(key: string): Promise<ICache<T>> {
    if (this.memory[key]) return this.memory[key];
    return this.storageService.get(`app-cache-${key}`);
  }

  public watchData<T>(key: string, callback: ICacheWatcher<T>): () => void {
    this.get<T>('key').then(value => callback(value));
    this.watchers[key] = [...(this.watchers[key] ?? []), callback];

    return () => {
      this.watchers[key] = this.watchers[key].filter(w => w !== callback);
    };
  }

  public remove(key: string) {
    this.memory[key] = null;
    this.storageService.remove(`app-cache-${key}`);
    this.sendWatchData(key, null);
  }

  public async saveData<T>(
    key: string,
    data: T,
    options?: { persist: boolean; expirationMinutes: number }
  ): Promise<ICache<T>> {
    const cache: ICache<T> = {
      createdAt: new Date(),
      expirationDate: dateFnsAddMinutes(new Date(), options?.expirationMinutes ?? 5),
      data
    };

    options?.persist ? this.storageService.set(`app-cache-${key}`, cache) : (this.memory[key] = cache);

    this.sendWatchData(key, cache);
    return cache;
  }

  public isExpirated(cache: ICache): boolean {
    return dateFnsIsBefore(cache.expirationDate, new Date());
  }

  public async clear(): Promise<void> {
    this.memory = {};
    this.storageService.clear(key => key.startsWith('app-cache'));
  }

  private sendWatchData(key: string, data: any) {
    if (!this.watchers[key]?.length) return;
    this.watchers[key].forEach(watcher => watcher(data));
  }
}

const cacheService = new CacheService(storageService);
export default cacheService;

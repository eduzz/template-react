import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class BannerService {
  private deleted$ = new rxjs.BehaviorSubject<number[]>([]);

  public getBanner(code: number): any {
    return apiService.get('/producer/banner/' + code).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public list(): any {
    return apiService.get('/producer/banner').pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public save(banner: any): any {
    return apiService.post(`/producer/banner`, banner);
  }

  public edit(id: number, banner: any): any {
    return apiService.put(`/producer/banner/${id}`, banner);
  }

  public delete(id: number): any {
    return apiService.delete(`producer/banner/${id}`).pipe(
      rxjsOperators.map(() => this.deleted$.next([...this.deleted$.value, id]))
    );
  }
}

const bannerService = new BannerService();
export default bannerService;
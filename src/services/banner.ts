//import { IBanner } from 'interfaces/models/banner';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';

//import * as rxjs from 'rxjs';
class BannerService {
  /* private deleted$ = new rxjs.BehaviorSubject<number[]>([]);

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
  } */

  public getBannerlist(courseID: number): any {
    return apiService.get(`/producer/course/${courseID}/banners/`).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  /* public newBanner(): void {
    this.bannerInfo$.next();
  }

  public setBanners(banners: IBanner[]): void {
    this.banners$.next(banners);
  }

  public getBannerInfo(): rxjs.Observable<IBanner> {
    return this.bannerInfo$.asObservable();
  } */
}

const bannerService = new BannerService();
export default bannerService;
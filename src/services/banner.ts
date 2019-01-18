import { IBanner } from 'interfaces/models/banner';
import * as Rx from 'rxjs';
import RxOp from 'rxjs-operators';

import apiService from './api';

class BannerService {
  private bannerInfo$: Rx.Subject<IBanner> = new Rx.Subject();

  /* private deleted$ = new rxjs.BehaviorSubject<number[]>([]);

  public list(): any {
    return apiService.get('/producer/banner').pipe(
      RxOp.map(response => response.data),
    );
  }

  public edit(id: number, banner: any): any {
    return apiService.put(`/producer/banner/${id}`, banner);
  }

  public delete(id: number): any {
    return apiService.delete(`producer/banner/${id}`).pipe(
      RxOp.map(() => this.deleted$.next([...this.deleted$.value, id]))
    );
  } */

  public getBannerlist(courseID: number): any {
    return apiService.get(`/producer/courses/${courseID}/banners`).pipe(
      RxOp.map(response => response.data),
    );
  }

  public newBanner(): void {
    this.bannerInfo$.next();
  }

  public getBannerInfo(): Rx.Observable<IBanner> {
    return this.bannerInfo$.asObservable();
  }

  public save(courseID: number, banner: IBanner): any {

    if (!!banner.id)
      return apiService.post(`/producer/courses/${courseID}/banners`, banner);

    return apiService.put(`/producer/courses/${courseID}/banners/${banner.id}`, banner);
  }

  public editBanner(banner: IBanner): void {
    this.bannerInfo$.next(banner);
  }

  /* public setBanners(banners: IBanner[]): void {
    this.bannerInfo$.next(banners);
  } */
}

const bannerService = new BannerService();
export default bannerService;
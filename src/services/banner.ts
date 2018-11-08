import { IBanner } from 'interfaces/models/banner';
import * as rxjs from 'rxjs';

//import apiService from './api';

const mock: IBanner[] = [
  {
    courseId: 1,
    id: 1,
    img: 'https://via.placeholder.com/300x300',
    sequence: 1,
    title: 'Anúncio teste 1',
    urm: 'https://www.google.com',
  }, {
    courseId: 1,
    id: 2,
    img: 'https://via.placeholder.com/300x300',
    sequence: 1,
    title: 'Anúncio teste 2',
    urm: 'https://www.google.com',
  }, {
    courseId: 1,
    id: 3,
    img: 'https://via.placeholder.com/300x300',
    sequence: 1,
    title: 'Anúncio teste 3',
    urm: 'https://www.google.com',
  }, {
    courseId: 1,
    id: 4,
    img: 'https://via.placeholder.com/300x300',
    sequence: 1,
    title: 'Anúncio teste 4',
    urm: 'https://www.google.com',
  },
];

class BannerService {
  private banners$: rxjs.BehaviorSubject<IBanner[]> = new rxjs.BehaviorSubject(mock);
  private bannerInfo$: rxjs.Subject<IBanner> = new rxjs.Subject();
  /* private deleted$ = new rxjs.BehaviorSubject<number[]>([]);

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
  } */

  public list(): rxjs.Observable<IBanner[]> {
    return this.banners$.asObservable();
  }

  public newBanner(): void {
    this.bannerInfo$.next();
  }

  public setBanners(banners: IBanner[]): void {
    this.banners$.next(banners);
  }

  public getBannerInfo(): rxjs.Observable<IBanner> {
    return this.bannerInfo$.asObservable();
  }
}

const bannerService = new BannerService();
export default bannerService;
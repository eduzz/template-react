import { IUpsell, IUpsellCourse, IUpsellCourses, IUpsellList, IUpsellProduct } from 'interfaces/models/upsell';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class UpsellService {
  private deleted$ = new rxjs.BehaviorSubject<number[]>([]);
  private products$ = new rxjs.BehaviorSubject<IUpsellProduct[]>(null);

  public getCourses() {
    return apiService.get<IUpsellCourses[]>('producer/courses/my').pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public getCourse(courseId: number) {
    return apiService.get<IUpsellCourse>('/producer/upsell/gettreecourse/' + courseId).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public loadProducts(type: number): void {
    this.products$.next(null);

    apiService.get<IUpsellProduct[]>('/producer/upsell/products/' + type).pipe(
      rxjsOperators.map(response => response.data),
    ).subscribe(products => {
      this.products$.next(products);
    }, error => {
      this.products$.error(error);
    });
  }

  public getProducts(type: number): rxjs.Observable<IUpsellProduct[]> {
    if (!this.products$.value)
      this.loadProducts(type);

    return this.products$.asObservable();
  }

  public getUpsell(code: number) {
    return apiService.get<IUpsell>('/producer/upsell/' + code).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public list(orderBy: string, orderDirection: string) {
    return apiService.get<IUpsellList[]>('/producer/upsell', { orderby: orderBy, order: orderDirection }).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public save(upsell: IUpsell) {
    return !upsell.id ?
      apiService.post<IUpsellList>(`/producer/upsell`, upsell) :
      apiService.put<IUpsellList>(`/producer/upsell/${upsell.id}`, upsell);
  }

  public edit(id: number, upsell: IUpsellList) {
    return;
  }

  public delete(id: number) {
    return apiService.delete(`producer/upsell/${id}`).pipe(
      rxjsOperators.map(() => this.deleted$.next([...this.deleted$.value, id]))
    );
  }
}

const upsellService = new UpsellService();
export default upsellService;
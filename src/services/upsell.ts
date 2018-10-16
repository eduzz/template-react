import rxjsOperators from 'rxjs-operators';
import * as rxjs from 'rxjs';

import apiService from './api';

class UpsellService {
  private deleted$ = new rxjs.BehaviorSubject<number[]>([]);

  public getCourses(): any {
    return apiService.get('producer/courses/my').pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public getCourse(courseId: number): any {
    return apiService.get('/producer/upsell/gettreecourse/' + courseId).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public getProducts(type: number): any {
    return apiService.get('/producer/upsell/products/' + type).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public getUpsell(code: number): any {
    return apiService.get('/producer/upsell/' + code).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public list(orderBy: string, orderDirection: string): any {
    return apiService.get('/producer/upsell', { orderby: orderBy, order: orderDirection }).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public save(upsell: any): any {
    return apiService.post(`/producer/upsell`, upsell);
  }

  public edit(id: number, upsell: any): any {
    return apiService.put(`/producer/upsell/${id}`, upsell);
  }

  public delete(id: number): any {
    return apiService.delete(`producer/upsell/${id}`).pipe(
      rxjsOperators.map(() => this.deleted$.next([...this.deleted$.value, id]))
    );
  }
}

const upsellService = new UpsellService();
export default upsellService;
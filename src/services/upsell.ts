import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class UpsellService {
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
}

const upsellService = new UpsellService();
export default upsellService;
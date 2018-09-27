import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class UpsellService {
  public getCourses(): any {
    return apiService.get('producer/courses/my').pipe(
      rxjsOperators.map(response => response.data),
    );
  }
}

const upsellService = new UpsellService();
export default upsellService;
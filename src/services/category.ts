import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class CategoryService {
  public getCategories(orderBy: string, orderDirection: string): any {
    return apiService.get('producer/categories', { orderby: orderBy, order: orderDirection }).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public addCategory(category: string): any {
    return apiService.post('producer/categories', { category }).pipe(
      rxjsOperators.map(response => response.data),
    );
  }
}

const categoryService = new CategoryService();
export default categoryService;
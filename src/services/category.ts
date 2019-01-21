import { ICategory } from 'interfaces/models/category';
import * as Rx from 'rxjs';
import RxOp, { ICacheResult } from 'rxjs-operators';

import apiService from './api';

class CategoryService {
  public getCategories(): Rx.Observable<ICacheResult<ICategory[]>> {
    return apiService.get('producer/categories').pipe(
      RxOp.map(response => response.data),
      RxOp.cache('category'),
    );
  }

  public addCategory(category: string): Rx.Observable<ICategory> {
    return apiService.post('producer/categories', { name: category }).pipe(
      RxOp.cacheClean('category'),
      RxOp.map(response => response.data),
    );
  }
}

const categoryService = new CategoryService();
export default categoryService;
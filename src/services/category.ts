import * as Rx from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from 'interfaces/models/category';

class CategoryService {
  private categories$ = new BehaviorSubject(null);

  public loadCategories(): void {
    apiService.get('producer/categories').pipe(
      rxjsOperators.map(response => response.data),
    ).subscribe(categories => {
      this.categories$.next(categories);
    }, error => {
      this.categories$.error(error);
    });
  }

  public getCategories(): Rx.Observable<ICategory[]> {
    if (!this.categories$.value)
      this.loadCategories();

    return this.categories$.asObservable();
  }

  public addCategory(category: string): Rx.Observable<ICategory> {
    return apiService.post('producer/categories', { name: category }).pipe(
      rxjsOperators.map(response => response.data),
      rxjsOperators.tap(() => this.loadCategories())
    );
  }
}

const categoryService = new CategoryService();
export default categoryService;
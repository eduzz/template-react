import rxjsOperators from 'rxjs-operators';

import apiService from './api';
import { BehaviorSubject } from 'rxjs';

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

  public getCategories(): any {
    if (!this.categories$.value)
      this.loadCategories();

    return this.categories$.asObservable();
  }

  public addCategory(category: string): any {
    return apiService.post('producer/categories', { name: category }).pipe(
      rxjsOperators.map(response => response.data),
      rxjsOperators.tap(() => this.loadCategories())
    );
  }
}

const categoryService = new CategoryService();
export default categoryService;
import rxjsOperators from 'rxjs-operators';

import apiService from './api';
import { ReplaySubject } from 'rxjs';
import tokenService from './token';

class CategoryService {

  private category$ = new ReplaySubject(1);

  constructor() {
    tokenService.getTokens().pipe(
      rxjsOperators.filter(token => !!token),
    ).subscribe(() => {
      this.category$.next([]);
      this.loadCategories();
    });
  }

  public loadCategories(): void {
    apiService.get('producer/categories').pipe(
      rxjsOperators.map(response => response.data),
    ).subscribe(categories => {
      this.category$.next(categories);
    });
  }

  public getCategories(): any {
    return this.category$.asObservable();
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
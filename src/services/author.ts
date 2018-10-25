import { IAuthor } from 'interfaces/models/author';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class AuthorService {
  private deleted$ = new rxjs.BehaviorSubject<number[]>([]);

  public list(orderBy: string, orderDirection: string): rxjs.Observable<IAuthor[]> {
    return apiService.get<IAuthor[]>('/producer/authors', { orderby: orderBy, order: orderDirection }).pipe(
      rxjsOperators.map(response => response.data),
      rxjsOperators.combineLatest(this.deleted$),
      rxjsOperators.map(([authors, deleted]) => authors.filter(c => !deleted.includes(c.id))),
    );
  }

  public get(id: number): rxjs.Observable<IAuthor> {
    return apiService.get<IAuthor>(`/producer/authors/${id}`).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public save(params: Partial<IAuthor & { html: String }>) {
    const stream$ = !params.id ?
      apiService.post<number>('/producer/authors', params) :
      apiService.put<number>(`/producer/authors/${params.id}`, params);

    return stream$.pipe(
      rxjsOperators.map(response => response.data || params.id)
    );
  }

  public delete(id: number): rxjs.Observable<void> {
    return apiService.delete(`/producer/authors/${id}`).pipe(
      rxjsOperators.map(() => this.deleted$.next([...this.deleted$.value, id]))
    );
  }
}

const authorService = new AuthorService();
export default authorService;
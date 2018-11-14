import { IAuthor } from 'interfaces/models/author';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class AuthorService {
  private update$ = new rxjs.BehaviorSubject<boolean>(true);

  public list(params: IPaginationParams): rxjs.Observable<IPaginationResponse<IAuthor>> {
    return this.update$.pipe(
      rxjsOperators.switchMap(() => apiService.get<IAuthor[]>('/producer/authors', params)),
    );
  }

  public get(id: number): rxjs.Observable<IAuthor> {
    return apiService.get<IAuthor>(`/producer/authors/${id}`).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public save(params: Partial<IAuthor>) {
    const stream$ = !params.id ?
      apiService.post<IAuthor>('/producer/authors', params) :
      apiService.put<IAuthor>(`/producer/authors/${params.id}`, params);

    return stream$.pipe(
      rxjsOperators.tap(() => this.update$.next(true)),
      rxjsOperators.map(result => result.data)
    );
  }

  public delete(id: number): rxjs.Observable<void> {
    return apiService.delete(`/producer/authors/${id}`).pipe(
      rxjsOperators.map(() => this.update$.next(true))
    );
  }
}

const authorService = new AuthorService();
export default authorService;
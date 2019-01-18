import { IAuthor } from 'interfaces/models/author';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import * as Rx from 'rxjs';
import RxOp from 'rxjs-operators';

import apiService from './api';

class AuthorService {
  private update$ = new Rx.BehaviorSubject<boolean>(true);

  public list(params: IPaginationParams): Rx.Observable<IPaginationResponse<IAuthor>> {
    return this.update$.pipe(
      RxOp.switchMap(() => apiService.get<IAuthor[]>('/producer/authors', params)),
    );
  }

  public get(id: number): Rx.Observable<IAuthor> {
    return apiService.get<IAuthor>(`/producer/authors/${id}`).pipe(
      RxOp.map(response => response.data),
    );
  }

  public save(params: Partial<IAuthor>) {
    const stream$ = !params.id ?
      apiService.post<IAuthor>('/producer/authors', params) :
      apiService.put<IAuthor>(`/producer/authors/${params.id}`, params);

    return stream$.pipe(
      RxOp.tap(() => this.update$.next(true)),
      RxOp.map(result => result.data)
    );
  }

  public delete(id: number): Rx.Observable<void> {
    return apiService.delete(`/producer/authors/${id}`).pipe(
      RxOp.map(() => this.update$.next(true))
    );
  }
}

const authorService = new AuthorService();
export default authorService;
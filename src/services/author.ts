import { IAuthor } from 'interfaces/models/author';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class AuthorService {
  private deleted$ = new rxjs.BehaviorSubject<number[]>([]);

  public list(params: IPaginationParams): rxjs.Observable<IPaginationResponse<IAuthor>> {
    return apiService.get<IAuthor[]>('/producer/authors', params).pipe(
      rxjsOperators.combineLatest(this.deleted$),
      rxjsOperators.map(([result, deleted]) => {
        return {
          ...result,
          data: result.data.filter(c => !deleted.includes(c.id))
        };
      }),
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
      rxjsOperators.map(response => response.data)
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
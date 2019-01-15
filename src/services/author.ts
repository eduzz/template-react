import { IAuthor } from 'interfaces/models/author';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import * as Rx from 'rxjs';
import RxOp, { ICacheResult } from 'rxjs-operators';

import apiService from './api';

class AuthorService {
  public list(params: IPaginationParams): Rx.Observable<ICacheResult<IPaginationResponse<IAuthor>>> {
    return apiService.get<IAuthor[]>('/producer/authors', params).pipe(
      RxOp.cache('author')
    );
  }

  public get(id: number): Rx.Observable<IAuthor> {
    return apiService.get<IAuthor>(`/producer/authors/${id}`).pipe(
      RxOp.map(response => response.data)
    );
  }

  public save(params: Partial<IAuthor>) {
    const stream$ = !params.id ?
      apiService.post<IAuthor>('/producer/authors', params) :
      apiService.put<IAuthor>(`/producer/authors/${params.id}`, params);

    return stream$.pipe(
      RxOp.cacheClean('author'),
      RxOp.map(result => result.data)
    );
  }

  public delete(id: number): Rx.Observable<void> {
    return apiService.delete(`/producer/authors/${id}`).pipe(
      RxOp.cacheClean('author'),
    );
  }
}

const authorService = new AuthorService();
export default authorService;
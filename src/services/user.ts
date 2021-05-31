import { Observable } from 'rxjs';

import { IPaginationResponse, IPaginationParams } from '@eduzz/houston-hooks/usePaginatedObservable';

import IUser from 'interfaces/models/user';

import apiService, { ApiService } from './api';

export class UserService {
  constructor(private apiService: ApiService) {}

  public list(params: IPaginationParams): Observable<IPaginationResponse<IUser>> {
    return this.apiService.get('/user', params);
  }

  public current(): Observable<IUser> {
    return this.apiService.get('/user/current');
  }

  public save(model: Partial<IUser>): Observable<IUser> {
    return this.apiService.post('/user', model);
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`/user/${id}`);
  }
}

const userService = new UserService(apiService);
export default userService;

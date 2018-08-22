import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import { IUser } from 'interfaces/user';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService, { ApiService } from './api';

export class UserService {
  constructor(private apiService: ApiService) { }

  public list(params: IPaginationParams): rxjs.Observable<IPaginationResponse<IUser>> {
    return this.apiService.get<IUser[]>('/users', params).pipe(
      //TEST from https://jsonplaceholder.typicode.com/users
      rxjsOperators.map(users => {
        return { ...params, total: users.length, results: users };
      })
    );
  }

  public save(model: IUser): rxjs.Observable<IUser> {
    return this.apiService.post('/user', model);
  }

  public delete(id: number): rxjs.Observable<void> {
    return this.apiService.delete(`/user/${id}`);
  }
}

const userService = new UserService(apiService);
export default userService;
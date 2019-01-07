import { DeepReadonly } from 'helpers/immutable';
import IUser from 'interfaces/models/user';
import IUserRole from 'interfaces/models/userRole';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs-operators';

import apiService, { ApiService } from './api';

export class UserService {
  constructor(private apiService: ApiService) { }

  public list(params: IPaginationParams): Rx.Observable<IPaginationResponse<IUser>> {
    return this.apiService.get('/user', params);
  }

  public roles(refresh: boolean = false): Rx.Observable<DeepReadonly<IUserRole[]>> {
    return this.apiService.get('/user/roles').pipe(
      RxOp.cache('user-service-roles', { refresh })
    );
  }

  public save(model: IUser): Rx.Observable<IUser> {
    return this.apiService.post('/user', model);
  }

  public delete(id: number): Rx.Observable<void> {
    return this.apiService.delete(`/user/${id}`);
  }
}

const userService = new UserService(apiService);
export default userService;
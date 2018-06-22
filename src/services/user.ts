import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import { IUser } from 'interfaces/user';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService, { ApiService } from './api';

export class UserService {
  constructor(private apiService: ApiService) { }

  public list(params: IPaginationParams): rxjs.Observable<IPaginationResponse<IUser>> {
    return this.apiService.get('/user', params);
  }

  public save(model: IUser): rxjs.Observable<void> {
    return rxjs.of(model).pipe(
      rxjsOperators.delay(2000),
      rxjsOperators.map(() => null)
    );
  }
}

const userService = new UserService(apiService);
export default userService;
import IUser from 'interfaces/models/user';

import { IPaginationParams, IPaginationResponse } from '@eduzz/houston-hooks/usePromisePaginated';

import apiService, { ApiService } from './api';

export class UserService {
  constructor(private apiService: ApiService) {}

  public list(params: IPaginationParams): Promise<IPaginationResponse<IUser>> {
    return this.apiService.get('/user', params);
  }

  public current(): Promise<IUser> {
    return this.apiService.get('/user/current');
  }

  public save(model: Partial<IUser>): Promise<IUser> {
    return this.apiService.post('/user', model);
  }

  public delete(id: number): Promise<void> {
    return this.apiService.delete(`/user/${id}`);
  }
}

const userService = new UserService(apiService);
export default userService;

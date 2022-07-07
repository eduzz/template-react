import { IPaginationParams } from '@eduzz/houston-hooks/usePromisePaginated';

import apiService from './api';

import { User, UserList, userListSchema, userSchema } from '@/schemas/user';

export class UserService {
  public list(params: IPaginationParams): Promise<UserList> {
    return apiService.get('/user', params, userListSchema);
  }

  public current(): Promise<User> {
    return apiService.get('/user/current', null, userSchema);
  }

  public save(model: Partial<User>): Promise<User> {
    return apiService.post('/user', model, userSchema);
  }

  public delete(id: number): Promise<void> {
    return apiService.delete(`/user/${id}`);
  }
}

const userService = new UserService();
export default userService;

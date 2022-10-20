import Pagination from '@/interfaces/pagination';
import { User } from '@/interfaces/user';

import apiService from './api';

class userService {
  public list(params: Pagination) {
    return apiService.get<User[]>('/user', params);
  }

  public current() {
    return apiService.get<User>('/user');
  }

  public save(model: Partial<User>) {
    return apiService.post('/user', model);
  }

  public delete(id: number) {
    return apiService.delete(`/user/${id}`);
  }
}

const UserService = new userService();

export default UserService;

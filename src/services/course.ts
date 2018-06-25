import { ICourse } from 'interfaces/course';
import { IPaginationParams } from 'interfaces/pagination';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService, { ApiService } from './api';

export class CourseService {
  constructor(private apiService: ApiService) { }

  public list(params: IPaginationParams): rxjs.Observable<ICourse[]> {
    return this.apiService.get('/user/courses', params).pipe(
      rxjsOperators.map(c => c.data)
    );
  }

  public delete(user: ICourse): rxjs.Observable<void> {
    return rxjs.of(user).pipe(
      rxjsOperators.delay(400),
      rxjsOperators.map(() => null)
    );
  }
}

const courseService = new CourseService(apiService);
export default courseService;
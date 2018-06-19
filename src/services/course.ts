import { ICourse } from 'interfaces/course';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService, { ApiService } from './api';

export class CourseService {
  constructor(private apiService: ApiService) { }

  public list(): rxjs.Observable<ICourse[]> {
    return this.apiService.get('/courses').pipe(
      rxjsOperators.map(c => c.data)
    );
  }
}

const courseService = new CourseService(apiService);
export default courseService;
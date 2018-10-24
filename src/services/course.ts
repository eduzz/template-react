import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class CourseService {
  public getCourse(id: number): any {
    return apiService.get('producer/courses/' + id).pipe(
      rxjsOperators.map(response => response.data),
    );
  }
}

const courseService = new CourseService();
export default courseService;
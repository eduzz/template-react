import RxOp from 'rxjs-operators';

import apiService from './api';

class CourseService {
  public getCourse(id: number): any {
    return apiService.get('producer/courses/' + id).pipe(
      RxOp.map(response => response.data),
    );
  }

  public save(course: any): any {
    return apiService.post(`/producer/courses`, course);
  }

  public edit(id: number, course: any): any {
    return apiService.put(`/producer/courses/${id}`, course);
  }
}

const courseService = new CourseService();
export default courseService;
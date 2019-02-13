import { ICourse } from 'interfaces/models/course';
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

  public getCourses(types?: string[]) {
    let params = '?';
    types.map(type => params += `types[]=${type}&`);

    return apiService.get<ICourse[]>(`producer/courses/my${params}`).pipe(
      RxOp.map(response => response.data),
    );
  }
}

const courseService = new CourseService();
export default courseService;
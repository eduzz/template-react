import { ICourse, IExtendAccess } from 'interfaces/models/course';
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

  public getCourses(types?: number[]) {
    return apiService.get<ICourse[]>(`producer/courses/my`, { types }).pipe(
      RxOp.map(response => response.data),
    );
  }

  public extendAccess(studentId: number, data: IExtendAccess) {
    return apiService.put(`producer/students/${studentId}/change-expire`, data).pipe(
      RxOp.map(response => response.data),
      RxOp.cacheClean(`student-courses-${studentId}`),
    );
  }
}

const courseService = new CourseService();
export default courseService;
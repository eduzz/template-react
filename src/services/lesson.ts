import RxOp from 'rxjs-operators';

import apiService from './api';

class LessonService {
  public getLesson(lessonId: number): any {
    return apiService.get(`producer/lessons/${lessonId}`).pipe(
      RxOp.map(response => response.data),
    );
  }

  public save(lesson: any): any {
    return apiService.post(`/producer/lessons`, lesson);
  }

  public edit(lessonId: number, lesson: any): any {
    return apiService.put(`/producer/lessons/${lessonId}`, lesson);
  }
}

const lessonService = new LessonService();
export default lessonService;
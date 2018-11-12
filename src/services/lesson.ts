import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class LessonService {
  public getLesson(id: number): any {
    return apiService.get('producer/lessons/' + id).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public save(lesson: any): any {
    return apiService.post(`/producer/lessons`, lesson);
  }

  public edit(id: number, lesson: any): any {
    return apiService.put(`/producer/lessons/${id}`, lesson);
  }
}

const lessonService = new LessonService();
export default lessonService;
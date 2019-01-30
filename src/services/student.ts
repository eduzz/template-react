import { IFiltersModel, IStudent, IStudentActivity, IStudentCourse } from 'interfaces/models/student';
import { IPaginationParams } from 'interfaces/pagination';
import * as Rx from 'rxjs';
import RxOp from 'rxjs-operators';
import { API_ENDPOINT } from 'settings';

import apiService from './api';
import tokenService, { TokenService } from './token';

export interface IStudentListResult {
  error?: any;
  students?: IStudent[];
  hasMore?: boolean;
}

class StudentService {
  private initialPaginator: IPaginationParams = { page: 1, size: 8 };

  private filters$ = new Rx.BehaviorSubject<IFiltersModel>({});
  private paginator$ = new Rx.BehaviorSubject<IPaginationParams>(this.initialPaginator);
  private students$ = new Rx.BehaviorSubject<IStudentListResult>({});

  constructor(private tokenService: TokenService) {
    this.filters$.subscribe(() => {
      this.paginator$.next(this.initialPaginator);
    });

    this.paginator$.pipe(RxOp.skip(1)).subscribe(() => {
      this.loadStudents();
    });
  }

  private loadStudents() {
    if (this.paginator$.value.page <= this.initialPaginator.page) {
      this.students$.next({});
    }

    apiService.get<IStudent[]>('producer/students', { ...this.filters$.value, ...this.paginator$.value }).pipe(
    ).subscribe(response => {
      this.students$.next({
        hasMore: response.paginator.page < response.paginator.total_pages,
        students: [
          ...(this.students$.value.students || []),
          ...(response.data || []),
        ],
      });
    }, error => this.students$.next({ error }));
  }

  public loadMoreStudents() {
    this.paginator$.next({
      ...this.paginator$.value,
      page: this.paginator$.value.page + 1,
    });
  }

  public getStudents() {
    if (!this.students$.value.students) {
      this.loadStudents();
    }

    return this.students$.asObservable();
  }

  public getStudent(id: number) {
    return apiService.get<IStudent>(`/producer/students/${id}`).pipe(
      RxOp.map(response => response.data),
    );
  }

  public getStudentCourses(id: number) {
    return apiService.get<IStudentCourse[]>(`/producer/students/${id}/contents`).pipe(
      RxOp.map(response => response.data),
      RxOp.cache(`student-courses-${id}`),
    );
  }

  public getStudentCourseProgress(studentId: number, courseId: number, type: number) {
    return apiService.get<{ percentage: number }>(`/producer/students/${studentId}/contents/${courseId}/progress/${type}`).pipe(
      RxOp.map(response => response.data.percentage),
    );
  }

  public getStudentLogs(studentId: number) {
    return apiService.get<IStudentActivity[]>(`/producer/students/${studentId}/logs`).pipe(
      RxOp.map(response => response.data),
    );
  }

  public getStudentLogsUrl(studentId: number) {
    return this.tokenService.getTokens().pipe(
      RxOp.map(({ token }) => `${API_ENDPOINT}/producer/students/${studentId}/logs/export?t=${token}`)
    );
  }

  public getFilters() {
    return this.filters$.asObservable();
  }

  public setFilters(filters: IFiltersModel) {
    this.filters$.next({ ...filters });
  }

  public releaseModules(student_id: number, course_id: number): any {
    return apiService.post(`/producer/students/${student_id}/allow-modules`, { course_id });
  }

  public disableCourse(student_id: number, course_id: number): any {
    return apiService.post(`/producer/students/${student_id}/disable-course`, { course_id });
  }

  public removeAccess(student_id: number, course_id: number): any {
    return apiService.delete(`/producer/students/${student_id}/remove-access`, { course_id }).pipe(
      RxOp.cacheClean(`student-courses-${student_id}`),
    );
  }

  public accessLink(student_id: number, course_id: number): any {
    return apiService.get(`/producer/students/${student_id}/access-link`, { course_id });
  }
}

const studentService = new StudentService(tokenService);
export default studentService;
import { IFiltersModel, IStudent, IStudentActivity, IStudentCourse } from 'interfaces/models/student';
import { IPaginationParams } from 'interfaces/pagination';
import * as Rx from 'rxjs';
import RxOp from 'rxjs-operators';
import { API_ENDPOINT } from 'settings';

import apiService from './api';
import tokenService, { TokenService } from './token';

class StudentService {
  private initialFilters: IFiltersModel = {
    name: '',
    email: '',
    last_used_at_start: null,
    last_used_at_end: null,
  };
  private initialPaginator: IPaginationParams = { page: 1, size: 8 };
  private filters$: Rx.BehaviorSubject<IFiltersModel> = new Rx.BehaviorSubject(this.initialFilters);
  private paginator$: Rx.BehaviorSubject<IPaginationParams> = new Rx.BehaviorSubject(this.initialPaginator);
  private students$: Rx.BehaviorSubject<IStudent[]> = new Rx.BehaviorSubject(null);
  private totalPages: number = this.initialPaginator.page;

  constructor(private tokenService: TokenService) {
    this.filters$.subscribe(() => {
      this.paginator$.next(this.initialPaginator);
    });

    this.paginator$.pipe(
      RxOp.skip(1),
    ).subscribe(() => {
      this.loadStudents();
    });
  }

  public loadStudents() {
    if (this.paginator$.value.page <= this.initialPaginator.page)
      this.students$.next(null);

    apiService.get<IStudent[]>('producer/students', { ...this.filters$.value, ...this.paginator$.value }).pipe(
      RxOp.tap(response => this.totalPages = response.paginator.total_pages),
      RxOp.map(response => response.data),
    ).subscribe(students => {
      if (this.paginator$.value.page <= this.initialPaginator.page)
        return this.students$.next(students);

      this.students$.next([
        ...this.students$.value,
        ...students,
      ]);
    }, error => {
      this.students$.error(error);
    });
  }

  public loadMoreStudents() {
    this.paginator$.next({
      ...this.paginator$.value,
      page: this.paginator$.value.page + 1,
    });
  }

  public getStudents() {
    if (!this.students$.value)
      this.loadStudents();

    return this.students$.asObservable();
  }

  public getStudent(id: number) {
    return apiService.get<IStudent>(`/producer/students/${id}`).pipe(
      RxOp.map(response => response.data),
      RxOp.cache(`student-${id}`),
    );
  }

  public getStudentCourses(id: number) {
    return apiService.get<IStudentCourse[]>(`/producer/students/${id}/contents`).pipe(
      RxOp.map(response => response.data),
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

  public setFilters(filters: IFiltersModel) {
    this.filters$.next({ ...filters });
  }

  public getFilters() {
    return this.filters$.asObservable();
  }

  public getInitialFilters() {
    return this.initialFilters;
  }

  public hasMoreStudents() {
    return !!(this.totalPages - this.paginator$.value.page);
  }

  public changeStudentEmail(student_id: number, data: string) {
    return apiService.post(`/producer/students/${student_id}/change-email`, { email: data }).pipe(
      RxOp.cacheClean(`student-${student_id}`)
    );
  }

  public changeStudentPassword(student_id: number, data: string) {
    return apiService.post(`/producer/students/${student_id}/change-password`, { password: data });
  }

  public sendRecoveryPassword(student_id: number) {
    return apiService.post(`/producer/students/${student_id}/send-link-recovery`, {});
  }

  public removeStudent(student_id: number) {
    return apiService.delete(`/producer/students/${student_id}/remove-student`);
  }
}

const studentService = new StudentService(tokenService);
export default studentService;
import { IEmail } from 'interfaces/models/email';
import {
  IFiltersModel,
  IStudent,
  IStudentActivity,
  IStudentCourse,
  IStudentCourseAcquisition,
} from 'interfaces/models/student';
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
  total_results?: number;
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
      this.students$.next({ students: null });
    }

    apiService.get<IStudent[]>('producer/students', { ...this.filters$.value, ...this.paginator$.value }).subscribe(response => {
      this.students$.next({
        hasMore: response.paginator.page < response.paginator.total_pages,
        total_results: response.paginator.total_rows,
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
    this.loadStudents();
    return this.students$.asObservable();
  }

  public getTotalStudents() {
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
      RxOp.cache(`student-courses-${id}`),
    );
  }

  public getStudentCourseProgress(studentId: number, courseId: number, type: number) {
    return apiService.get<{ percentage: number }>(`/producer/students/${studentId}/contents/progress/${courseId}/${type}`).pipe(
      RxOp.map(response => response.data.percentage),
    );
  }

  public getStudentCourseAcquisitions(id: number, courseId: number) {
    return apiService.get<IStudentCourseAcquisition[]>(`/producer/students/${id}/contents/${courseId}/acquisition`).pipe(
      RxOp.map(response => response.data),
      RxOp.cache(`student-${id}-courses-${courseId}-acquisition`),
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

  public getExportStudentsUrl(filters: IFiltersModel) {
    let params = '&';

    Object.entries(filters).forEach(([key, value]) => {
      params += `${key}=${value}&`;
    });

    return this.tokenService.getTokens().pipe(
      RxOp.map(({ token }) => `${API_ENDPOINT}/producer/students/export?t=${token}${params}`)
    );
  }

  public getFilters() {
    return this.filters$.asObservable();
  }

  public setFilters(filters: IFiltersModel) {
    this.filters$.next({ ...filters });
  }

  public releaseModules(studentId: number, courseId: number, acquisitonId: number) {
    return apiService.put(`/producer/students/${studentId}/contents/acquisition/${acquisitonId}/allow-modules`).pipe(
      RxOp.cacheClean(`student-${studentId}-courses-${courseId}-acquisition`)
    );
  }

  public disableCourse(studentId: number, courseId: number, acquisitonId: number) {
    return apiService.put(`/producer/students/${studentId}/contents/acquisition/${acquisitonId}/status`).pipe(
      RxOp.cacheClean(`student-${studentId}-courses-${courseId}-acquisition`)
    );
  }

  public removeAccess(studentId: number, courseId: number, acquisitonId: number) {
    return apiService.delete(`/producer/students/${studentId}/contents/acquisition/${acquisitonId}/remove-access`).pipe(
      RxOp.cacheClean(`student-${studentId}-courses-${courseId}-acquisition`),
    );
  }

  public accessLink(studentId: number, courseId: number, acquisitonId: number): Rx.Observable<string> {
    return apiService.get(`/producer/students/${studentId}/contents/acquisition/${acquisitonId}/access-link`).pipe(
      RxOp.map(r => r.data),
      RxOp.map(token => `${window.location.origin}/integracao/login?t=${token}`)
    );
  }

  public changeStudentEmail(student_id: number, data: string) {
    return apiService.put(`/producer/students/${student_id}/change-email`, { email: data }).pipe(
      RxOp.cacheClean(`student-${student_id}`)
    );
  }

  public changeStudentPassword(student_id: number, data: string) {
    return apiService.put(`/producer/students/${student_id}/change-password`, { password: data });
  }

  public sendRecoveryPassword(student_id: number) {
    return apiService.put(`/producer/students/${student_id}/recovery-password`, {});
  }

  public removeStudent(student_id: number) {
    return apiService.delete(`/producer/students/${student_id}/remove-all-access`);
  }

  public sendEmail(e: IEmail, filters: IFiltersModel) {
    let params = '&';
    Object.entries(filters).forEach(([key, value]) => {
      params += `${key}=${value || ''}&`;
    });
    return apiService.post(
      `/producer/students/send-email?title=${e.title}&message=${e.message}${!!e.course_name ? `&${e.course_name}` : ''}&${params}`,
      {});
  }
}

const studentService = new StudentService(tokenService);
export default studentService;
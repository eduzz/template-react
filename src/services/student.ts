import { IEmail } from 'interfaces/models/email';
import {
  IFiltersModel,
  IStudent,
  IStudentActivity,
  IStudentCourse,
  IStudentCourseAcquisition,
} from 'interfaces/models/student';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import * as Rx from 'rxjs';
import RxOp, { ICacheResult } from 'rxjs-operators';
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
  private filters$ = new Rx.BehaviorSubject<IFiltersModel>({});
  private total$ = new Rx.BehaviorSubject<number>(0);

  constructor(private tokenService: TokenService) {
    this.filters$.pipe(
      RxOp.cacheClean('student-list')
    ).subscribe();
  }

  public getStudents(params: IPaginationParams): Rx.Observable<ICacheResult<IPaginationResponse<IStudent>>> {
    return this.filters$.pipe(
      RxOp.switchMap(filters => {
        const parameters = !!filters.newFilter ? { ...params, page: 1 } : params;
        delete filters.newFilter;
        return apiService.get('producer/students', { ...filters, ...parameters });
      }),
      RxOp.cache('student-list', { refresh: true }),
      RxOp.tap(result => this.total$.next((result.data || { paginator: { total_rows: 0 } }).paginator.total_rows))
    );
  }

  public getTotalStudents() {
    return this.total$.asObservable();
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
      RxOp.filter(tokens => !!tokens),
      RxOp.map(({ token }) => `${API_ENDPOINT}/producer/students/${studentId}/logs/export?t=${token}`)
    );
  }

  public getExportStudentsUrl(filters: IFiltersModel) {
    let params = '&';

    Object.entries(filters).forEach(([key, value]) => {
      params += `${key}=${value instanceof Date ? value.toISOString() : value}&`;
    });

    return this.tokenService.getTokens().pipe(
      RxOp.filter(tokens => !!tokens),
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
      params += `${key}=${value instanceof Date ? value.toISOString() : value || ''}&`;
    });
    return apiService.post(
      `/producer/students/send-email?${!!e.course_name ? `&${e.course_name}` : ''}&${params}`, {
        title: e.title,
        message: e.message
      });
  }
}

const studentService = new StudentService(tokenService);
export default studentService;
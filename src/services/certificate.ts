import { ICertificate, ICertificateCourse } from 'interfaces/models/certificate';
import * as Rx from 'rxjs';
import RxOp, { ICacheResult } from 'rxjs-operators';

import apiService from './api';
import cacheService from './cache';

class CertificateService {
  private openAddCourse$ = new Rx.BehaviorSubject<number>(null);

  public list(orderBy: string, orderDirection: string): Rx.Observable<ICacheResult<ICertificate[]>> {
    return apiService.get<ICertificate[]>('producer/certificates', { orderby: orderBy, order: orderDirection }).pipe(
      RxOp.map(response => response.data),
      RxOp.cache('certificate')
    );
  }

  public get(id: number): Rx.Observable<ICertificate> {
    return apiService.get<ICertificate>(`producer/certificates/${id}`).pipe(
      RxOp.map(response => response.data)
    );
  }

  public save(params: Partial<ICertificate & { html: String }>) {
    const stream$ = !params.id ?
      apiService.post<number>('/producer/certificates', params) :
      apiService.put<number>(`/producer/certificates/${params.id}`, params);

    return stream$.pipe(
      RxOp.cacheClean('certificate'),
      RxOp.map(response => response.data || params.id)
    );
  }

  public searchCourses(certificateId: number, search: string): Rx.Observable<ICertificateCourse[]> {
    return apiService.get<ICertificateCourse[]>(`producer/certificates/${certificateId}/courses`, { search, size: 10 }).pipe(
      RxOp.map(response => response.data)
    );
  }

  public getCourses(certificateId: number): Rx.Observable<ICertificateCourse[]> {
    return apiService.get<ICertificateCourse[]>(`producer/certificates/${certificateId}/courses`).pipe(
      RxOp.map(response => (response.data || []).filter(d => d.has_selected)),
      RxOp.cache(`certificate-courses-${certificateId}`),
      RxOp.filter(({ updating }) => !updating),
      RxOp.map(({ data }) => data)
    );
  }

  public addCourse(certificateId: number, course: ICertificateCourse) {
    return this.getCourses(certificateId).pipe(
      RxOp.first(),
      RxOp.map(courses => [...courses, { ...course, has_selected: true }]),
      RxOp.switchMap(courses => this.saveCourses(certificateId, courses)),
    );
  }

  public removeCourse(certificateId: number, course: ICertificateCourse) {
    return this.getCourses(certificateId).pipe(
      RxOp.first(),
      RxOp.map(courses => courses.filter(c => c.id !== course.id)),
      RxOp.switchMap(courses => this.saveCourses(certificateId, courses)),
    );
  }

  private saveCourses(certificateId: number, courses: ICertificateCourse[]) {
    return Rx.of(courses).pipe(
      RxOp.switchMap(courses => cacheService.saveData(`certificate-courses-${certificateId}`, courses)),
      RxOp.map(courses => courses.data.map(c => c.id)),
      RxOp.switchMap(courses => apiService.put(`producer/certificates/${certificateId}/courses`, { courses })),
    );
  }

  public delete(id: number): Rx.Observable<void> {
    return apiService.delete(`producer/certificates/${id}`).pipe(
      RxOp.cacheClean('certificate')
    );
  }

  public openAddCourse(certificateId: number): void {
    this.openAddCourse$.next(certificateId);
  }

  public closeAddCourse(): void {
    this.openAddCourse$.next(null);
  }

  public shouldOpenAddCourse(): Rx.Observable<number> {
    return this.openAddCourse$.asObservable();
  }
}

const certificateService = new CertificateService();
export default certificateService;
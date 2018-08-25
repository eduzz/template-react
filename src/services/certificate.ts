import { ICertificate, ICertificateCourse } from 'interfaces/models/certificate';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';
import cacheService from './cache';

class CertificateService {
  private openAddCourse$ = new rxjs.BehaviorSubject<number>(null);
  private deleted$ = new rxjs.BehaviorSubject<number[]>([]);

  public list(): rxjs.Observable<ICertificate[]> {
    return apiService.get<ICertificate[]>('producer/certificates').pipe(
      rxjsOperators.map(response => response.data),
      rxjsOperators.cache('certificate-list'),
      rxjsOperators.combineLatest(this.deleted$),
      rxjsOperators.map(([certificates, deleted]) => certificates.filter(c => !deleted.includes(c.id))),
    );
  }

  public send(params: any) {
    return apiService.post('/producer/certificates', params);
  }

  public searchCourses(certificateId: number, search: string): rxjs.Observable<ICertificateCourse[]> {
    return apiService.get<ICertificateCourse[]>(`producer/certificates/${certificateId}/courses`, { search, size: 10 }).pipe(
      rxjsOperators.map(response => response.data)
    );
  }

  public getCourses(certificateId: number): rxjs.Observable<ICertificateCourse[]> {
    return apiService.get<ICertificateCourse[]>(`producer/certificates/${certificateId}/courses`).pipe(
      rxjsOperators.map(response => (response.data || []).filter(d => d.has_selected)),
      rxjsOperators.cache(`certificate-courses-${certificateId}`)
    );
  }

  public addCourse(certificateId: number, course: ICertificateCourse) {
    return this.getCourses(certificateId).pipe(
      rxjsOperators.first(),
      rxjsOperators.map(courses => [...courses, { ...course, has_selected: true }]),
      rxjsOperators.switchMap(courses => this.saveCourses(certificateId, courses))
    );
  }

  public removeCourse(certificateId: number, course: ICertificateCourse) {
    return this.getCourses(certificateId).pipe(
      rxjsOperators.first(),
      rxjsOperators.map(courses => courses.filter(c => c.id !== course.id)),
      rxjsOperators.switchMap(courses => this.saveCourses(certificateId, courses))
    );
  }

  private saveCourses(certificateId: number, courses: ICertificateCourse[]) {
    return rxjs.of(courses).pipe(
      rxjsOperators.switchMap(courses => cacheService.saveData(`certificate-courses-${certificateId}`, courses)),
      rxjsOperators.map(courses => courses.data.map(c => c.id)),
      rxjsOperators.switchMap(courses => apiService.put(`producer/certificates/${certificateId}/courses`, { courses }))
    );
  }

  public delete(id: number): rxjs.Observable<void> {
    return apiService.delete(`producer/certificates/${id}`).pipe(
      rxjsOperators.map(() => this.deleted$.next([...this.deleted$.value, id]))
    );
  }

  public openAddCourse(certificateId: number): void {
    this.openAddCourse$.next(certificateId);
  }

  public closeAddCourse(): void {
    this.openAddCourse$.next(null);
  }

  public shouldOpenAddCourse(): rxjs.Observable<number> {
    return this.openAddCourse$.asObservable();
  }
}

const certificateService = new CertificateService();
export default certificateService;
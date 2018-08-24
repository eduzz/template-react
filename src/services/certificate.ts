import { ICertificate, ICertificateCourse } from 'interfaces/models/certificate';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class CertificateService {

  public list(params: IPaginationParams): rxjs.Observable<IPaginationResponse<ICertificate>> {
    return apiService.get('producer/certificates').pipe(
      rxjsOperators.cache('certificate-list'),
      rxjsOperators.map(response => ({ ...response.paginator, results: response.data })),
    );
  }

  public getCourses(id: number): rxjs.Observable<IPaginationResponse<ICertificateCourse>> {
    return apiService.get(`producer/certificates/${id}/courses`).pipe(
      rxjsOperators.map(response => ({ ...response.paginator, results: response.data })),
    );
  }
}

const certificateService = new CertificateService();
export default certificateService;
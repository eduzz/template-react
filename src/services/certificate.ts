import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

import apiService from './api';

class CertificateService {

  public list(params: IPaginationParams): rxjs.Observable<IPaginationResponse<ICertificate>> {
    return apiService.get('/certificate').pipe(
      rxjsOperators.cache('certificate-list'),
      rxjsOperators.map(response => response.data)
    );
  }
}

const certificateService = new CertificateService();
export default certificateService;
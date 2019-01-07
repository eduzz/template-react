import ICompany from 'interfaces/models/company';
import * as Rx from 'rxjs';

import apiService, { ApiService } from './api';

export class CompanyService {
  constructor(private apiService: ApiService) { }

  public get(): Rx.Observable<ICompany> {
    return this.apiService.get('/company');
  }

  public save(model: ICompany): Rx.Observable<ICompany> {
    return this.apiService.post('/company', model);
  }
}

const companyService = new CompanyService(apiService);
export default companyService;
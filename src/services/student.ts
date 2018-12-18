import rxjsOperators from 'rxjs-operators';
import apiService from './api';
import { IStudent } from 'interfaces/models/student';
import { IFiltersModel } from 'components/Pages/Admin/Students/List/Filters';

class StudentService {
  private filters: IFiltersModel;

  public list(filters: IFiltersModel) {
    return apiService.get<IStudent[]>('producer/learners', { ...filters, page: 1, size: 15 }).pipe(
      rxjsOperators.map(response => response.data),
    );
  }

  public setFilters(filters: IFiltersModel) {
    this.filters = filters;
  }

  public getFilters() {
    return this.filters;
  }
}

const studentService = new StudentService();
export default studentService;
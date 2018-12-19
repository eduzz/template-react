import * as Rx from 'rxjs';
import rxjsOperators from 'rxjs-operators';
import apiService from './api';
import { IStudent, IFiltersModel } from 'interfaces/models/student';
import { IPaginationParams } from 'interfaces/pagination';

class StudentService {
  private initialFilters: IFiltersModel = {
    name: '',
    email: '',
    last_used_at_start: '',
    last_used_at_end: '',
  };
  private initialPaginator: IPaginationParams = {
    page: 1,
    size: 3,
  };
  private filters$: Rx.BehaviorSubject<IFiltersModel> = new Rx.BehaviorSubject(this.initialFilters);
  private paginator$: Rx.BehaviorSubject<IPaginationParams> = new Rx.BehaviorSubject(this.initialPaginator);
  private students$: Rx.BehaviorSubject<IStudent[]> = new Rx.BehaviorSubject(null);

  constructor() {
    this.filters$.subscribe(() => {
      this.paginator$.next(this.initialPaginator);
    });

    this.paginator$.subscribe(() => {
      this.loadStudents();
    });
  }

  public loadStudents() {
    if (this.paginator$.value.page <= this.initialPaginator.page)
      this.students$.next(null);

    apiService.get<IStudent[]>('producer/students', { ...this.filters$.value, ...this.paginator$.value }).pipe(
      rxjsOperators.map(response => response.data),
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

  public setFilters(filters: IFiltersModel) {
    this.filters$.next({ ...filters });
  }

  public getFilters() {
    return this.filters$.asObservable();
  }

  public getInitialFilters() {
    return this.initialFilters;
  }
}

const studentService = new StudentService();
export default studentService;
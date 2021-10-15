import { BehaviorSubject, tap, first } from 'rxjs';

export class AutoCompleteService {
  private search$ = new BehaviorSubject('');
  private counter$ = new BehaviorSubject(0);

  setSearch = (value: string) => this.search$.next(value);
  addCounter = () =>
    this.counter$.pipe(
      first(),
      tap(counter => this.counter$.next(counter + 1))
    );

  getSearch = () => this.search$.asObservable();
  // getSearchResult = () => this.search$.asObservable();

  getCounter = () => this.counter$.asObservable();
}

const autoCompleteService = new AutoCompleteService();
export default autoCompleteService;

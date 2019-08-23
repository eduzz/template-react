import { Observable, Operator, Subscriber, Subscription } from 'rxjs';

let globalLogService: ILogService;

export interface ILogService {
  handleError: (error: any) => void;
}

export interface IIgnoreParam {
  (err: any): boolean;
}

export function setup(logService: ILogService) {
  globalLogService = logService;
}

export function logError<T>(ignore: IIgnoreParam = null) {
  return (source: Observable<T>) => source.lift<T>(new LogErrorOperator(ignore));
}

class LogErrorOperator<T> implements Operator<T, T> {
  constructor(private ignore: IIgnoreParam) {}

  public call(subscriber: Subscriber<any>, source: Observable<any>): Subscription {
    return source.subscribe(new LogErrorSubscriber(subscriber, this.ignore));
  }
}

class LogErrorSubscriber extends Subscriber<any> {
  constructor(protected destination: Subscriber<any>, private ignore: IIgnoreParam) {
    super(destination);

    this.ignore = ignore;
  }

  public _next(value: any): void {
    this.destination.next(value);
  }

  public _complete(): void {
    this.destination.complete();
  }

  public _error(err: any): void {
    if (!this.ignore || !this.ignore(err)) {
      globalLogService.handleError(err);
    }

    this.destination.error(err);
  }
}

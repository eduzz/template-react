import { Observable, Subscriber, Subscription } from 'rxjs';
import * as RxOp from 'rxjs/operators';

let globalLoaderComponent: ILoader;

export interface ILoader {
  show: Function;
  hide: Function;
}

export function setup(loader: ILoader): void {
  globalLoaderComponent = loader;
}

export function loader<T>(loaderComponent: ILoader = globalLoaderComponent) {
  return (source: Observable<T>) => source.lift<T>(new LoaderOperator(loaderComponent));
}

class LoaderOperator {
  constructor(private loaderComponent: any) { }

  public call(subscriber: Subscriber<any>, source: Observable<any>): Subscription {
    return source.pipe(
      RxOp.delay(500)
    ).subscribe(new LoaderSubscriber(subscriber, this.loaderComponent));
  }
}

class LoaderSubscriber extends Subscriber<any> {
  private ref: string;

  constructor(
    protected destination: Subscriber<any>,
    private loader: ILoader
  ) {
    super(destination);

    this.ref = Date.now().toString();
    this.show();
  }

  public _next(value: any): void {
    this.hide();
    this.destination.next(value);
  }

  public _complete(): void {
    this.hide();
    this.destination.complete();
  }

  public _error(err: any): void {
    this.hide();
    this.destination.error(err);
  }

  public _unsubscribe(): void {
    this.hide();
    this.destination.unsubscribe();
  }

  private show(): void {
    this.loader.show(this.ref);
  }

  private hide(): void {
    this.loader.hide(this.ref);
  }
}
import { Observable, Operator, Subscriber, Subscription, TeardownLogic } from 'rxjs';

export interface IBindableComponent {
  subscriptions: Subscription[];
  componentWillUnmount(): void;
}

export function bindComponent<T>(component: IBindableComponent) {
  return (source: Observable<T>) => source.lift<T>(new BindComponentOperator(component));
}

class BindComponentOperator<T> implements Operator<T, T> {
  constructor(private component: IBindableComponent) { }

  public call(subscriber: Subscriber<any>, source: Observable<any>): TeardownLogic {
    const subscription = source.subscribe(subscriber);

    if (!this.component.subscriptions) {
      this.component.subscriptions = [];
    }

    this.component.subscriptions.push(subscription);
    return subscription;
  }
}
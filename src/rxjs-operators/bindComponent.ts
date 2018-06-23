import { Observable, Operator, Subscriber, Subscription, TeardownLogic } from 'rxjs';

interface IBindableComponent {
  _bindComponentSubscriptions?: Subscription[];
  componentWillUnmount?(): void;
}

export function bindComponent<T>(component: React.Component) {
  return (source: Observable<T>) => source.lift<T>(new BindComponentOperator(component));
}

class BindComponentOperator<T> implements Operator<T, T> {
  constructor(private component: IBindableComponent) { }

  public call(subscriber: Subscriber<any>, source: Observable<any>): TeardownLogic {
    const subscription = source.subscribe(subscriber);

    if (!this.component._bindComponentSubscriptions) {
      this.component._bindComponentSubscriptions = [];

      const originalWillUnmount = this.component.componentWillUnmount;
      this.component.componentWillUnmount = () => {
        this.component._bindComponentSubscriptions.forEach((s: Subscription) => {
          s.unsubscribe();
        });

        originalWillUnmount && originalWillUnmount();
      };
    }

    this.component._bindComponentSubscriptions.push(subscription);
    return subscription;
  }
}
import { Observable, Subscription } from 'rxjs';

export function bindComponent<T>(component: any) {
  return (source: Observable<T>) => {
    return new Observable(subscriber => {
      const subscription = source.subscribe(subscriber);

      if (!component.bindComponentSubscriptions) {
        component.bindComponentSubscriptions = [];

        const originalWillUnmount = component.componentWillUnmount;
        component.componentWillUnmount = () => {
          component.bindComponentSubscriptions.forEach((s: Subscription) => {
            s.unsubscribe();
          });

          originalWillUnmount && originalWillUnmount();
        };
      }

      component.bindComponentSubscriptions.push(subscription);
      return subscription;
    });
  };
}

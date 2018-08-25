import 'react';

declare module 'React' {
  interface ClassAttributes<T> {
    innerRef?: Ref<T>;
  }
}
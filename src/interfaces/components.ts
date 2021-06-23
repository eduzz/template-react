import { memo } from 'react';

type ComponentType = Parameters<typeof memo>[0];

interface IStaticMethods {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Function;
}

export default function createStaticComponent<P extends ComponentType, F extends () => IStaticMethods>(
  component: P,
  staticMethods: F
): React.MemoExoticComponent<P> & ReturnType<F> {
  const result = memo(component);

  Object.keys(staticMethods()).forEach(key => {
    result[key] = staticMethods[key];
  });

  return result as any;
}

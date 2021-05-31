import { RouteComponentProps } from 'react-router';

export interface IRouteProps<P = Record<string, never>> extends Partial<RouteComponentProps<P>> {}

// children?: ReactNode;
//         key?: Key;
//         ref?: LegacyRef<T>;

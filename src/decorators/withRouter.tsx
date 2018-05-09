import { withRouter } from 'react-router';

export function WithRouter() {
  return function <T>(target: T): T {
    return withRouter(target as any) as any;
  };
}
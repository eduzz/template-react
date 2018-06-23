import Pages from 'components/Pages';
import { IAppRoute } from 'interfaces/route';

const baseRoutes: IAppRoute[] = [{
  path: '/',
  component: Pages,
  allowAnonymous: true
}];

export default baseRoutes;
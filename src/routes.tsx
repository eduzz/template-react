import Pages from 'components/Pages';
import { IAppRoute } from 'interfaces/route';

const baseRoutes: IAppRoute[] = [{
  path: '/',
  component: Pages,
  subRoutes: Pages.routes,
}];

export default baseRoutes;
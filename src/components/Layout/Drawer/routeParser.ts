import { IAppRoute } from 'interfaces/route';
import MoreHorizIcon from 'mdi-react/MoreHorizIcon';

export interface IDrawerItem {
  icon?: typeof MoreHorizIcon;
  display: string;
  route?: Partial<IAppRoute>;
  children?: IDrawerItem[];
}

export function routeParser(routes: IAppRoute[], parent?: IAppRoute): IDrawerItem[] {
  return routes.filter(r => r.sideDrawer).sort((a, b) => {
    return a.sideDrawer.order > b.sideDrawer.order ? 1 :
      a.sideDrawer.order < b.sideDrawer.order ? -1 : 0;
  }).map(route => {
    const path = ((parent ? parent.path : '') + route.path)
      .replace(/\/$/gi, '') || '/';

    return {
      ...route.sideDrawer,
      route: { ...route, path },
      items: !route.component || !route.component.routes ? [] :
        routeParser(route.component.routes, route)
    };
  });
}
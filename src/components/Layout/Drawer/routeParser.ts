import { IAppRoute } from 'interfaces/route';

export interface IAppRouteParsed extends Partial<IAppRoute> {
  parent?: Partial<IAppRoute>;
  subRoutes?: IAppRouteParsed[];
}

export function routeParser(routes: Partial<IAppRoute>[], parent?: Partial<IAppRoute>): IAppRouteParsed[] {
  return routes.filter(r => r.sideDrawer).sort((a, b) => {
    return a.sideDrawer.order > b.sideDrawer.order ? 1 :
      a.sideDrawer.order < b.sideDrawer.order ? -1 : 0;
  }).map(route => {
    const path = ((parent ? parent.path : '') + route.path)
      .replace(/\/$/gi, '') || '/';

    return {
      ...route,
      parent,
      path,
      subRoutes: !route.component || !route.component.routes ? [] :
        routeParser(route.component.routes, route)
    };
  });
}
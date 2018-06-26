import { IAppRoute } from 'interfaces/route';

export interface IAppRouteParsed extends IAppRoute {
  parent: IAppRoute;
  subRoutes: IAppRouteParsed[];
}

export function parseRoutes(routes: IAppRoute[], parent?: IAppRoute): IAppRouteParsed[] {
  return routes.filter(r => r.sideDrawer).sort((a, b) => {
    return a.sideDrawer.order > b.sideDrawer.order ? 1 :
      a.sideDrawer.order < b.sideDrawer.order ? -1 : 0;
  }).map(route => {
    const path = ((parent ? parent.path : '') + route.path)
      .replace(/\/\//gi, '/')
      .replace(/\/$/gi, '') || '/';

    return {
      ...route,
      parent,
      path,
      subRoutes: !route.component.routes ? [] :
        parseRoutes(route.component.routes, route)
    };
  });
}
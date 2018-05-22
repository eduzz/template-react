import AppRouterProtected from 'components/Router/RouterProtected';
import { History } from 'history';
import { IAppRoute } from 'interfaces/route';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

interface IState {
  loaded: boolean;
}

interface IProps {
  routes: IAppRoute[];
}

export const RouterContext = React.createContext<() => AppRouter>(null);

export default class AppRouter extends React.PureComponent<IProps, IState> {
  browserRouter: RouteComponentProps<any>;

  get history(): History {
    return this.browserRouter.history;
  }

  previousPage() {
    this.history.goBack();
  }

  reload(): void {
    /* Hack for reload, dont judge me: https://github.com/ReactTraining/react-router/issues/1982 */
    const path = this.history.location.pathname;
    this.history.replace('/reload');
    setTimeout(() => this.history.replace(path));
  }

  navigate(path: string): void {
    if (path === this.history.location.pathname) {
      this.reload();
      return;
    }

    this.history.push(path);
  }

  render(): JSX.Element {
    const { routes } = this.props;

    return (
      <BrowserRouter ref={ref => this.browserRouter = ref as any}>
        <Switch>
          {routes.map(router => this.renderRoute(router))}
          <Route path='/reload' exact render={() => <div></div>} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </BrowserRouter>
    );
  }

  public renderRoute(route: IAppRoute, baseUrl: string = ''): JSX.Element {
    const path = (baseUrl + route.path)
      .replace(/\/\//gi, '/')
      .replace(/\/$/gi, '') || '/';

    return (
      <Route key={route.path} exact={route.exact} path={path}
        render={props => route.allowAnonymous ?
          <route.component {...props}>
            <Switch>
              {(route.subRoutes || []).map(child => this.renderRoute(child, path))}
            </Switch>
          </route.component> :
          <AppRouterProtected route={route} routeProps={props}>
            <Switch>
              {(route.subRoutes || []).map(child => this.renderRoute(child, path))}
            </Switch>
          </AppRouterProtected>
        } />
    );
  }

}

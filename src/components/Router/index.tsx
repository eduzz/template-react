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

export default class AppRouter extends React.PureComponent<IProps, IState> {
  browserRouter: RouteComponentProps<any>;

  get history(): History {
    return this.browserRouter.history;
  }

  public previousPage() {
    this.history.goBack();
  }

  public reload(): void {
    /* Hack for reload, dont judge me: https://github.com/ReactTraining/react-router/issues/1982 */
    const path = this.history.location.pathname;
    this.history.replace('/reload');
    setTimeout(() => this.history.replace(path));
  }

  public navigate(path: string): void {
    if (path === this.history.location.pathname) {
      this.reload();
      return;
    }

    this.history.push(path);
  }

  public render(): JSX.Element {
    const { routes } = this.props;

    return (
      <BrowserRouter ref={ref => this.browserRouter = ref as any}>
        <Switch>
          {routes.map(this.renderRoute.bind(this))}
          <Route path='/reload' exact render={() => <div></div>} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </BrowserRouter>
    );
  }

  public renderRoute(route: IAppRoute, index: number): JSX.Element {
    return (
      <Route key={index} exact={route.exact} path={route.path}
        render={props => route.allowAnonymous ?
          <route.component {...props}>
            {(route.subRoutes || []).map(this.renderRoute.bind(this))}
          </route.component> :
          <AppRouterProtected route={route} routeProps={props}>
            {(route.subRoutes || []).map(this.renderRoute.bind(this))}
          </AppRouterProtected>
        } />
    );
  }

}

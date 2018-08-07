import AppRouterProtected from 'components/Router/RouterProtected';
import { History, Location } from 'history';
import { IAppRoute } from 'interfaces/route';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';

interface IProps {
  routes: IAppRoute[];
}

export const RouterContext = React.createContext<() => AppRouter>(null);

export default class AppRouter extends React.PureComponent<IProps> {
  private listenUnregister: Function;
  private location$: rxjs.ReplaySubject<Location>;

  browserRouter: RouteComponentProps<any>;

  constructor(props: IProps) {
    super(props);
    this.location$ = new rxjs.ReplaySubject(1);
  }

  componentDidMount() {
    this.location$.next(this.browserRouter.history.location);
    this.listenUnregister = this.browserRouter.history.listen(location => {
      this.location$.next(location);
    });
  }

  componentWillUnmount() {
    this.listenUnregister && this.listenUnregister();
  }

  get history(): History {
    return this.browserRouter.history;
  }

  previousPage = () => {
    this.history.goBack();
  }

  observeChange = () => {
    return this.location$.asObservable().pipe(
      rxjsOperators.sampleTime(500)
    );
  }

  reload = (): void => {
    /* Hack for reload, dont judge me: https://github.com/ReactTraining/react-router/issues/1982 */
    const path = this.history.location.pathname;
    this.history.replace('/reload');
    setTimeout(() => this.history.replace(path));
  }

  navigate = (path: string): void => {
    if (path === this.history.location.pathname) {
      this.reload();
      return;
    }

    this.history.push(path);
  }

  changeUrl = (url: string) => {
    window.history.pushState && window.history.pushState(null, null, url);
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

  private renderRoute(route: IAppRoute, baseUrl: string = ''): JSX.Element {
    const path = (baseUrl + route.path)
      .replace(/\/\//gi, '/')
      .replace(/\/$/gi, '') || '/';

    return (
      <Route key={route.path} exact={route.exact} path={path}
        render={props => route.allowAnonymous ?
          <route.component {...props}>
            <Switch>
              {(route.component.routes || []).map(child => this.renderRoute(child, path))}
              <Route render={() => <Redirect to='/' />} />
            </Switch>
          </route.component> :
          <AppRouterProtected route={route} routeProps={props}>
            <Switch>
              {(route.component.routes || []).map(child => this.renderRoute(child, path))}
              <Route render={() => <Redirect to='/' />} />
            </Switch>
          </AppRouterProtected>
        } />
    );
  }

}

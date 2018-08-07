import { IAppRoute } from 'interfaces/route';
import * as React from 'react';
import { PureComponent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

interface IState {
  isAuthenticated: boolean;
  canAccess: boolean;
}

interface IProps {
  route: IAppRoute;
  routeProps: RouteComponentProps<any>;
}

export default class AppRouterProtected extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { isAuthenticated: false, canAccess: false };
  }

  componentDidMount() {
    authService.getUser().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(user => {
      if (!user) {
        authService.openLogin();
        return this.setState({ isAuthenticated: false });
      }

      this.setState({
        isAuthenticated: true,
        canAccess: user.canAccess(...(this.props.route.roles || []))
      });
    });
  }

  render(): JSX.Element {
    const { isAuthenticated, canAccess } = this.state;
    const { route, routeProps, children } = this.props;

    if (!isAuthenticated) {
      return null;
    }

    if (!canAccess) {
      return <Redirect to='/' />;
    }

    return (
      <route.component {...routeProps}>
        {children}
      </route.component>
    );
  }
}
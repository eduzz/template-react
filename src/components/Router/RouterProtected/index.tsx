import { IAppRoute } from 'interfaces/route';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { IAppStoreState } from 'store';
import { openLoginDialog } from 'store/actionCreators/auth';

interface IProps {
  route: IAppRoute;
  routeProps: RouteComponentProps<any>;
}

interface IPropsFromConnect {
  isAuthenticated: boolean;
  canAccess: boolean;
  openLoginDialog?: typeof openLoginDialog;
}

class AppRouterProtected extends React.PureComponent<IProps & IPropsFromConnect> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { isAuthenticated, openLoginDialog } = this.props;

    if (isAuthenticated) return;
    openLoginDialog();
  }

  public render(): JSX.Element {
    const { route, routeProps, children, isAuthenticated, canAccess } = this.props;

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

const mapStateToProps = (state: IAppStoreState, ownProps: IProps) => {
  return {
    ...ownProps,
    isAuthenticated: state.auth.isAuthenticated,
    canAccess: true
  };
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  openLoginDialog
})(AppRouterProtected);
import { Fragment } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { enRoles } from 'interfaces/models/user';
import authService from 'services/auth';

import PermissionHide from './PermissionHide';

interface IProps extends RouteProps {
  role?: enRoles;
}

export default class PermissionRoute extends Route<IProps> {
  private watcher: ReturnType<typeof authService.watchIsAuthenticated>;

  constructor(props: IProps) {
    super(props as any);
    this.state = { ...(this.state ?? {}) };
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();

    this.watcher = authService.watchIsAuthenticated(isAuthenticated => {
      this.setState({ isAuthenticated });
    });
  }

  componentWillUnmount() {
    this.watcher && this.watcher();
  }

  render() {
    const { isAuthenticated } = this.state;

    if (isAuthenticated === undefined) {
      return null;
    }

    if (!isAuthenticated) {
      return <Redirect to='/login' />;
    }

    return (
      <Fragment>
        <PermissionHide role={this.props.role}>{super.render()}</PermissionHide>

        <PermissionHide inverse role={this.props.role}>
          <p>Não encontrado</p>
        </PermissionHide>
      </Fragment>
    );
  }
}

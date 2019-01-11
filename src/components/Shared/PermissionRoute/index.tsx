import React, { Fragment } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import RxOp from 'rxjs-operators';
import authService from 'services/auth';

import PermissionHide from '../PermissionHide';

interface IProps extends RouteProps {
}

export default class PermissionRoute extends Route<IProps> {
  componentDidMount() {
    super.componentDidMount && super.componentDidMount();

    authService.isAuthenticated().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
      RxOp.tap(isAuthenticated => {
        if (isAuthenticated) return;
        authService.openLogin();
      })
    ).subscribe(isAuthenticated => {
      this.setState({ isAuthenticated });
    });
  }

  render() {
    const { isAuthenticated } = this.state;

    if (!isAuthenticated) {
      return null;
    }

    return (
      <Fragment>
        <PermissionHide>
          {super.render()}
        </PermissionHide>

        <PermissionHide inverse>
          <p>Não encontrado</p>
        </PermissionHide>
      </Fragment>
    );
  }
}

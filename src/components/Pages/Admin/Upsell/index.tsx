import { IAppRoute } from 'interfaces/route';
import React, { Fragment, PureComponent } from 'react';

import UpsellFormPage from './Form';
import UpsellListPage from './List';

export default class UpsellIndexPage extends PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/novo',
    component: UpsellFormPage
  }, {
    path: '/:id/editar',
    component: UpsellFormPage
  }, {
    path: '/',
    component: UpsellListPage
  }];

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}
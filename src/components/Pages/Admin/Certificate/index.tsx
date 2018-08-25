import { IAppRoute } from 'interfaces/route';
import React, { Fragment, PureComponent } from 'react';

import AddCourseDialog from './AddCourseDialog';
import CertificateFormPage from './Form';
import CertificateListPage from './List';

export default class CertificateIndexPage extends PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/novo',
    component: CertificateFormPage
  }, {
    path: '/:id/editar',
    component: CertificateFormPage
  }, {
    path: '/',
    component: CertificateListPage
  }];

  render() {
    return (
      <Fragment>
        <AddCourseDialog />
        {this.props.children}
      </Fragment>
    );
  }
}
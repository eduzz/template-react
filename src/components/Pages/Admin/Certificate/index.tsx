import React, { Fragment, PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import AddCourseDialog from './AddCourseDialog';
import CertificateFormPage from './Form';
import CertificateListPage from './List';

export default class CertificateIndexPage extends PureComponent {
  render() {
    return (
      <Fragment>
        <AddCourseDialog />

        <Switch>
          <Route path='*/novo' exact component={CertificateFormPage} />
          <Route path='*/:id/editar' exact component={CertificateFormPage} />
          <Route path='*/' exact component={CertificateListPage} />
        </Switch>
      </Fragment>
    );
  }
}
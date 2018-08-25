import Toolbar from 'components/Layout/Toolbar';
import FabButton from 'components/Shared/FabButton';
import PlusIcon from 'mdi-react/PlusIcon';
import React, { Fragment, PureComponent } from 'react';

import AddCourseDialog from './AddCourseDialog';
import CertificateList from './List';

interface IState {
}

export default class CertificateListPage extends PureComponent<{}, IState> {
  actions = [{
    icon: PlusIcon,
    onClick: () => console.log('create')
  }];

  render() {
    return (
      <Fragment>
        <Toolbar title='Certificados' />

        <FabButton actions={this.actions} />

        <AddCourseDialog />

        <CertificateList />
      </Fragment>
    );
  }
}
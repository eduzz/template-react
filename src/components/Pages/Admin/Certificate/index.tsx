import { Card } from '@material-ui/core';
import Toolbar from 'components/Layout/Toolbar';
import FabButton from 'components/Shared/FabButton';
import PlusIcon from 'mdi-react/PlusIcon';
import React, { Fragment, PureComponent } from 'react';

import CertificateList from './CertificateList';

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

        <Card><FabButton actions={this.actions} /></Card>

        <CertificateList />
      </Fragment>
    );
  }
}
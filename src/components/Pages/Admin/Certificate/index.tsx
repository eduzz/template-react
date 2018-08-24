import { Card } from '@material-ui/core';
import Toolbar from 'components/Layout/Toolbar';
import FabButton from 'components/Shared/FabButton';
import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import React, { Fragment, PureComponent } from 'react';

import CertificateList from './CertificateList';

interface IState {
}

export default class CertificateListPage extends PureComponent<{}, IState> {
  actions = [{
    icon: AccountPlusIcon,
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
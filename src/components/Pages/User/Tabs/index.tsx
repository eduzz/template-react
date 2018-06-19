import { Tab, Tabs } from '@material-ui/core';
import FabButton from 'components/FabButton';
import UserTabAccess from 'components/Pages/User/Tabs/Access';
import UserTabList from 'components/Pages/User/Tabs/List';
import Toolbar from 'components/Toolbar';
import { ToolbarTabs } from 'components/ToolbarTabs';
import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import KeyPlusIcon from 'mdi-react/KeyPlusIcon';
import * as React from 'react';
import { Fragment } from 'react';

import AccessGroupFormDialog from '../AccessGroupFormDialog';
import UserFormDialog from '../UserFormDialog';

interface IState {
  currentTab: number;
  dialogs: {
    user: boolean;
    accessGroup: boolean;
  };
}

export default class UserTabsPage extends React.PureComponent<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: 0,
      dialogs: { user: false, accessGroup: false }
    };
  }

  onTabChange(event: any, tab: number) {
    this.setState({ currentTab: tab });
  }

  openDialog(opened: boolean, dialog: keyof IState['dialogs']) {
    const dialogs = this.state.dialogs;
    dialogs[dialog] = opened;

    this.setState({ dialogs });
  }

  render() {
    const { currentTab dialogs } = this.state;

    return (
      <Fragment>
        <UserFormDialog opened={dialogs.user} />
        <AccessGroupFormDialog />

        <Toolbar title='Usuários' />

        <ToolbarTabs>
          <Tabs value={currentTab} onChange={this.onTabChange.bind(this)}>
            <Tab label='Lista' />
            <Tab label='Grupos de Acesso' />
          </Tabs>
        </ToolbarTabs>

        <span className={currentTab === 0 ? '' : 'hide'}>
          <FabButton hasTabs actions={[{
            icon: AccountPlusIcon,
            tooltip: 'Adicionar usuário',
            onClick: () => this.addUser()
          }]} />

          <UserTabList />
        </span>

        <span className={currentTab === 1 ? '' : 'hide'}>
          <FabButton hasTabs actions={[{
            icon: KeyPlusIcon,
            tooltip: 'Criar novo grupo',
            onClick: () => this.addAccessGroup()
          }]} />

          <UserTabAccess />
        </span>

      </Fragment>
    );
  }
}
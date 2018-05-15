import { Tab, Tabs } from '@material-ui/core';
import UserTabAccess from 'components/Pages/User/Tabs/Access';
import UserTabList from 'components/Pages/User/Tabs/List';
import Toolbar from 'components/Toolbar';
import { ToolbarTabs } from 'components/ToolbarTabs';
import * as React from 'react';
import { Fragment } from 'react';

interface IState {
  currentTab: number;
}

export default class UserTabsPage extends React.PureComponent<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { currentTab: 0 };
  }

  onTabChange(event: any, tab: number) {
    this.setState({ currentTab: tab });
  }

  render() {
    const { currentTab } = this.state;

    return (
      <Fragment>
        <Toolbar title='Usuários' />

        <ToolbarTabs>
          <Tabs value={currentTab} onChange={this.onTabChange.bind(this)}>
            <Tab label='Lista' />
            <Tab label='Grupos de Acesso' />
          </Tabs>
        </ToolbarTabs>

        <span className={currentTab === 0 ? '' : 'hide'}>
          <UserTabList />
        </span>

        <span className={currentTab === 1 ? '' : 'hide'}>
          <UserTabAccess />
        </span>
      </Fragment>
    );
  }
}
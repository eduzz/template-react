import { Tab, Tabs } from '@material-ui/core';
import FabButton from 'components/FabButton';
import UserTabAccess from 'components/Pages/User/Tabs/Access';
import UserTabList from 'components/Pages/User/Tabs/List';
import Toolbar from 'components/Toolbar';
import { ToolbarTabs } from 'components/ToolbarTabs';
import { AccountPlusIcon, KeyPlusIcon } from 'mdi-react';
import * as React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { openAccessGroupFormModal } from 'store/actionCreators/accessGroup';
import { openUserFormModal } from 'store/actionCreators/user';

interface IState {
  currentTab: number;
}

interface IPropsFromConnect {
  openUserFormModal?: typeof openUserFormModal;
  openAccessGroupFormModal?: typeof openAccessGroupFormModal;
}

class UserTabsPage extends React.PureComponent<IPropsFromConnect, IState> {
  constructor(props: any) {
    super(props);
    this.state = { currentTab: 0 };
  }

  onTabChange(event: any, tab: number) {
    this.setState({ currentTab: tab });
  }

  addUser() {
    this.props.openUserFormModal();
  }

  addAccessGroup() {
    this.props.openAccessGroupFormModal();
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

const mapStateToProps = (state: IAppStoreState, ownProps: {}) => {
  return {};
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
  openUserFormModal,
  openAccessGroupFormModal
})(UserTabsPage);
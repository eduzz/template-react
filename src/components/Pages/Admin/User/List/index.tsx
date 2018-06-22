import { Card, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { IStateList, ListComponent } from 'components/Abstract/List';
import FabButton from 'components/FabButton';
import TableWrapper from 'components/TableWrapper';
import Toolbar from 'components/Toolbar';
import { IPaginationParams } from 'interfaces/pagination';
import { IUser } from 'interfaces/user';
import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React, { Fragment } from 'react';
import rxjsOperators from 'rxjs-operators';
import userService from 'services/user';

import UserFormDialog from '../UserFormDialog';
import ListItem from './ListItem';

interface IState extends IStateList<IUser> {
  formOpened?: boolean;
}

export default class UserListPage extends ListComponent<{}, IState> {
  componentDidMount() {
    this.loadData();
  }

  loadData = (params: Partial<IPaginationParams> = {}) => {
    this.setState({ loading: true });

    userService.list(this.mergeParams(params)).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(items => {
      this.setPaginatedData(items);
    }, error => {
      this.setState({ error, loading: false });
    });
  }

  handleTryAgain = () => {
    this.loadData();
  }

  handlePaginate = (page: number, pageSize: number): void => {
    this.loadData({ page, pageSize });
    this.scrollTop && this.scrollTop();
  }

  formOpen = () => {
    this.setState({ formOpened: true });
  }

  formCallback = (reload: boolean) => {
    this.setState({ formOpened: false });

    if (!reload) return;
    this.loadData();
  }

  render() {
    const { items, formOpened, loading } = this.state;

    return (
      <Fragment>
        <Toolbar title='Usuários' />

        <Card>
          <FabButton actions={[{
            icon: AccountPlusIcon,
            onClick: this.formOpen
          }]} />

          <UserFormDialog
            opened={formOpened || false}
            onComplete={() => this.formCallback(true)}
            onCancel={() => this.formCallback(false)} />

          {this.renderLoader()}
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>
                    <IconButton disabled={loading} onClick={() => this.loadData()}>
                      <RefreshIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderEmptyAndErrorMessages(3)}
                {items.map(user =>
                  <ListItem key={user.id} user={user} />
                )}
              </TableBody>
            </Table>
          </TableWrapper>
          {this.renderTablePagination()}
        </Card>

      </Fragment>
    );
  }
}
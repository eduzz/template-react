import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { IStateList, ListComponent, TableCellSortable } from 'components/Abstract/List';
import FabButton from 'components/FabButton';
import UserFormDialog from 'components/Pages/User/UserFormDialog';
import TableWrapper from 'components/TableWrapper';
import { IUser } from 'interfaces/user';
import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import userService from 'services/user';

import ListItem from './ListItem';

interface IState extends IStateList<IUser> {
  formOpened?: boolean;
}

export default class UserTabList extends ListComponent<{}, IState> {
  constructor(props: {}) {
    super(props, 'name');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true });

    userService.list().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(items => {
      this.setAllItems(items);
    }, error => {
      this.setState({ error, loading: false });
    });
  }

  handleTryAgain = () => {
    this.loadData();
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
    const { items, formOpened } = this.state;

    return (
      <Paper>
        <FabButton hasTabs actions={[{
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
                <TableCellSortable {...this.sortableProps} column='name'>
                  Nome
                </TableCellSortable>
                <TableCell>Email</TableCell>
                <TableCell>Curso</TableCell>
                <TableCell>Grupo</TableCell>
                <TableCell>
                  <IconButton onClick={() => this.loadData()}>
                    <RefreshIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderEmptyAndErrorMessages(5)}
              {items.map(user =>
                <ListItem key={user.id} user={user} onDelete={this.loadData} />
              )}
            </TableBody>
          </Table>
        </TableWrapper>
        {this.renderTablePagination()}
      </Paper >
    );
  }
}
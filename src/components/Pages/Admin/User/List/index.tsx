import { Card, CardContent, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { IStateList, ListComponent, TableCellSortable } from 'components/Abstract/List';
import Toolbar from 'components/Layout/Toolbar';
import FabButton from 'components/Shared/FabButton';
import TableWrapper from 'components/Shared/TableWrapper';
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
  current?: IUser;
  formOpened?: boolean;
}

export default class UserListPage extends ListComponent<{}, IState> {
  actions = [{
    icon: AccountPlusIcon,
    onClick: () => this.handleCreate()
  }];

  constructor(props: {}) {
    super(props, 'fullName');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = (params: Partial<IPaginationParams> = {}) => {
    this.setState({ loading: true, error: null });

    userService.list(this.mergeParams(params)).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(items => {
      this.setPaginatedData(items);
    }, error => this.setError(error));
  }

  handleRefresh = () => this.loadData();

  handleCreate = () => {
    this.setState({ formOpened: true, current: null });
  }

  handleEdit = (current: IUser) => {
    this.setState({ formOpened: true, current });
  }

  formCallback = (user?: IUser) => {
    this.setState({ formOpened: false });

    this.state.current ?
      this.loadData() :
      this.handleChangeTerm(user.email);
  }

  formCancel = () => {
    this.setState({ formOpened: false });
  }

  render() {
    const { items, formOpened, loading, current } = this.state;

    return (
      <Fragment>
        <Toolbar title='Usuários' />

        <Card>
          <FabButton actions={this.actions} />

          <UserFormDialog
            opened={formOpened || false}
            user={current}
            onComplete={this.formCallback}
            onCancel={this.formCancel}
          />

          {this.renderLoader()}

          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={6} lg={4}>
                {this.renderSearch()}
              </Grid>
            </Grid>
          </CardContent>

          <TableWrapper minWidth={500}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellSortable {...this.sortableProps} column='fullName'>
                    Nome
                  </TableCellSortable>
                  <TableCellSortable {...this.sortableProps} column='email'>
                    Email
                  </TableCellSortable>
                  <TableCell>
                    <IconButton disabled={loading} onClick={this.handleRefresh}>
                      <RefreshIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderEmptyAndErrorMessages(3)}
                {items.map(user =>
                  <ListItem
                    key={user.id}
                    user={user}
                    onEdit={this.handleEdit}
                    onDeleteComplete={this.loadData}
                  />
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
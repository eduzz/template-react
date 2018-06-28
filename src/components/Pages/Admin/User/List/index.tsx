import { Card, CardContent, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { IStateList, ListComponent, TableCellSortable } from 'components/Abstract/List';
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
  constructor(props: {}) {
    super(props, 'fullName');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = (params: Partial<IPaginationParams> = {}) => {
    this.setState({ loading: true, error: null });

    userService.list(this.mergeParams(params)).pipe(
      rxjsOperators.delay(500),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(items => {
      this.setPaginatedData(items);
    }, error => this.setError(error));
  }

  formOpen = () => {
    this.setState({ formOpened: true });
  }

  formCallback = (reload: boolean, user?: IUser) => {
    this.setState({ formOpened: false });

    console.log(user);

    if (!reload) return;
    this.handleChangeTerm(user.email);
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
            onComplete={user => this.formCallback(true, user)}
            onCancel={() => this.formCallback(false)} />

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
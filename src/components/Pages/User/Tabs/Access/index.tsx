import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { IStateList, ListComponent, TableCellSortable } from 'components/Abstract/List';
import FabButton from 'components/FabButton';
import AccessGroupFormDialog from 'components/Pages/User/AccessGroupFormDialog';
import TableWrapper from 'components/TableWrapper';
import { IAccessGroup } from 'interfaces/accessGroup';
import KeyPlusIcon from 'mdi-react/KeyPlusIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import accessGroupService from 'services/accessGroup';

import ListItem from './ListItem';

interface IState extends IStateList<IAccessGroup> {
  formOpened?: boolean;
  current?: IAccessGroup;
}

export default class UserTabAccess extends ListComponent<{}, IState> {
  constructor(props: {}) {
    super(props, 'id');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true });

    accessGroupService.list().pipe(
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

  formOpen = (accessGroup?: IAccessGroup) => {
    this.setState({ formOpened: true, current: accessGroup });
  }

  formCallback = (reload: boolean) => {
    this.setState({ formOpened: false });

    if (!reload) return;
    this.loadData();
  }

  render() {
    const { items, formOpened, current } = this.state;

    return (
      <Paper>
        <FabButton hasTabs actions={[{
          icon: KeyPlusIcon,
          onClick: this.formOpen
        }]} />

        <AccessGroupFormDialog
          opened={formOpened || false}
          model={current}
          onComplete={() => this.formCallback(true)}
          onCancel={() => this.formCallback(false)} />

        {this.renderLoader()}
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCellSortable style={{ width: 80 }} {...this.sortableProps} column='id'>
                  #
                </TableCellSortable>
                <TableCellSortable {...this.sortableProps} column='name'>
                  Nome
                </TableCellSortable>
                <TableCell>
                  <IconButton onClick={this.loadData}>
                    <RefreshIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderEmptyAndErrorMessages(2)}
              {items.map(accessGroup =>
                <ListItem
                  key={accessGroup.id}
                  accessGroup={accessGroup}
                  onDelete={this.loadData}
                  onEdit={this.formOpen}
                />
              )}
            </TableBody>
          </Table>
        </TableWrapper>
        {this.renderTablePagination()}
      </Paper >
    );
  }
}
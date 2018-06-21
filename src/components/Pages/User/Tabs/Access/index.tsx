import { IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { IStateList, ListComponent } from 'components/Abstract/List';
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
}

export default class UserTabAccess extends ListComponent<{}, IState> {
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true });

    accessGroupService.list().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(items => {
      this.setAllData(items);
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
    const { items, loading, formOpened } = this.state;

    return (
      <Paper>
        <FabButton hasTabs actions={[{
          icon: KeyPlusIcon,
          onClick: this.formOpen
        }]} />

        <AccessGroupFormDialog
          opened={formOpened || false}
          onComplete={() => this.formCallback(true)}
          onCancel={() => this.formCallback(false)} />

        {loading && <LinearProgress color='secondary' />}
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 80 }}>#</TableCell>
                <TableCell>Nome</TableCell>
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
                  onEdit={() => null}
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
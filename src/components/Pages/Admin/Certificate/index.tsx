import { Card, CardContent, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { IStateList, ListComponent } from 'components/Abstract/List';
import Toolbar from 'components/Layout/Toolbar';
import FabButton from 'components/Shared/FabButton';
import TableWrapper from 'components/Shared/TableWrapper';
import { IPaginationParams } from 'interfaces/pagination';
import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React, { Fragment } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';
import ListItem from './List/ListItem';

interface IState extends IStateList<ICertificate> {
}

export default class CertificateListPage extends ListComponent<{}, IState> {
  actions = [{
    icon: AccountPlusIcon,
    onClick: () => console.log('create')
  }];

  constructor(props: {}) {
    super(props, 'fullName');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = (params: Partial<IPaginationParams> = {}) => {
    this.setState({ loading: true, error: null });

    certificateService.list(this.mergeParams(params)).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(items => {
      this.setPaginatedData(items);
    }, error => this.setError(error));
  }

  render() {
    const { items, loading } = this.state;

    return (
      <Fragment>
        <Toolbar title='Certificados' />

        <Card>
          <FabButton actions={this.actions} />

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
                  <TableCell>
                    Nome
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    <IconButton disabled={loading} onClick={this.handleRefresh}>
                      <RefreshIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderEmptyAndErrorMessages(3)}
                {items.map(certificate =>
                  <ListItem
                    key={certificate.id}
                    certificate={certificate}
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
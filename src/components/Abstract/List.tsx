import { TableCell, TablePagination, TableRow } from '@material-ui/core';
import { TablePaginationProps } from '@material-ui/core/TablePagination';
import ErrorMessage from 'components/ErrorMessage';
import IconMessage from 'components/IconMessage';
import CreationIcon from 'mdi-react/CreationIcon';
import { Component, Fragment } from 'react';
import React from 'react';

import { ScrollTopContext } from '../AppWrapper';

export interface IStateList<T = any> {
  page: number;
  pageSize: number;

  items: T[];
  all: T[];

  error?: any;
  loading: boolean;
}

export abstract class ListComponent<P = {}, S extends IStateList<any> = IStateList<any>> extends Component<P, S> {
  scrollTop: Function;
  abstract handleTryAgain: () => void;

  constructor(props: P) {
    super(props);

    this.state = {
      page: 0,
      pageSize: 10,
      items: [],
      all: [],
      loading: true
    } as any;
  }

  setAllData = (all: S['all']): void => {
    this.setState({ all, loading: false });
    this.handlePaginate();
  }

  handlePaginate = (page: number = this.state.page, pageSize: number = this.state.pageSize): void => {
    const { all, loading } = this.state;
    if (loading) return;

    this.setState({
      items: all.slice(pageSize * page, (pageSize * page) + pageSize),
      pageSize,
      page
    });

    this.scrollTop && this.scrollTop();
  }

  renderEmptyAndErrorMessages(numberOfcolumns: number) {
    const { error, items, loading } = this.state;

    return (
      <Fragment>
        {error && !loading &&
          <TableRow>
            <TableCell colSpan={numberOfcolumns} className='error'>
              <ErrorMessage error={error} tryAgain={this.handleTryAgain.bind(this)} />
            </TableCell>
          </TableRow>
        }
        {!error && !items.length && !loading &&
          <TableRow>
            <TableCell colSpan={numberOfcolumns}>
              <IconMessage icon={CreationIcon} message='Nenhum usuário criado' />
            </TableCell>
          </TableRow>
        }
      </Fragment>
    );
  }

  renderTablePagination(props: Partial<TablePaginationProps> = {}) {
    const { all, page, pageSize } = this.state;

    return (
      <Fragment>
        <ScrollTopContext.Consumer>
          {scrollTop => (this.scrollTop = scrollTop) && null}
        </ScrollTopContext.Consumer>

        <TablePagination
          labelRowsPerPage='items por página'
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          component='div'
          count={all.length}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          page={page}
          onChangePage={(event, page) => this.handlePaginate(page, pageSize)}
          onChangeRowsPerPage={(event) => this.handlePaginate(page, Number(event.target.value))}
          {...props}
        />
      </Fragment>
    );
  }
}
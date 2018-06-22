import { LinearProgress, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { TablePaginationProps } from '@material-ui/core/TablePagination';
import ErrorMessage from 'components/ErrorMessage';
import IconMessage from 'components/IconMessage';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import CreationIcon from 'mdi-react/CreationIcon';
import { Fragment, PureComponent } from 'react';
import React from 'react';

import { ScrollTopContext } from '../AppWrapper';

export interface IStateList<T = any> extends IPaginationParams {
  items: T[];
  allItems: T[];
  totalRows: number;

  error?: any;
  loading: boolean;
}

export abstract class ListComponent<P = {}, S extends IStateList = IStateList<any>> extends PureComponent<P, S> {
  scrollTop: Function;
  isPaginatedData: boolean = false;

  abstract handleTryAgain: () => void;

  constructor(props: P) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      items: [],
      allItems: [],
      totalRows: 0,
      loading: true
    } as any;
  }

  mergeParams = (params: Partial<IPaginationParams>): IPaginationParams => {
    const { term, page, size, orderBy, orderDirection } = this.state;
    return { term, page, size, orderBy, orderDirection, ...params };
  }

  setPaginatedData = (data: IStateList['items'][0], paginator: IPaginationResponse) => {
    const { totalPages, ...others } = paginator;
    this.isPaginatedData = true;

    this.setState({
      ...others,
      items: data,
      allItems: data,
      loading: false
    });
  }

  setAllItems = (allItems: S['allItems']): void => {
    const { page, size } = this.state;
    this.isPaginatedData = false;

    this.setState({ allItems, totalRows: allItems.length, loading: false });
    this.handlePaginate(page, size);
  }

  handlePaginate = (page: number, size: number): void => {
    if (this.isPaginatedData) {
      throw new Error('The data was paginated by the server, you must override this method');
    }

    const { allItems, loading } = this.state;
    if (loading) return;

    this.setState({
      items: allItems.slice(size * page, (size * page) + size),
      size,
      page
    });

    this.scrollTop && this.scrollTop();
  }

  renderLoader = () => {
    const { loading } = this.state;

    return (
      <div style={{ height: 5 }}>
        {loading && <LinearProgress color='secondary' />}
      </div>
    );
  }

  renderEmptyAndErrorMessages = (numberOfcolumns: number) => {
    const { error, items, loading } = this.state;

    return (
      <Fragment>
        {loading && !items.length &&
          <TableRow>
            <TableCell className='empty' colSpan={numberOfcolumns}>
              Carregando...
            </TableCell>
          </TableRow>
        }
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
              <IconMessage icon={CreationIcon} message='Está vázio por aqui...' />
            </TableCell>
          </TableRow>
        }
      </Fragment>
    );
  }

  renderTablePagination = (props: Partial<TablePaginationProps> = {}) => {
    const { totalRows, page, size, loading } = this.state;

    return (
      <div style={loading ? { pointerEvents: 'none', opacity: 0.7 } : null}>
        <ScrollTopContext.Consumer>
          {scrollTop => (this.scrollTop = scrollTop) && null}
        </ScrollTopContext.Consumer>

        <TablePagination
          labelRowsPerPage='items por página'
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          component='div'
          count={totalRows}
          rowsPerPage={size}
          rowsPerPageOptions={[10, 25, 50]}
          page={page}
          onChangePage={(event, page) => this.handlePaginate(page, size)}
          onChangeRowsPerPage={(event) => this.handlePaginate(page, Number(event.target.value))}
          {...props}
        />
      </div>
    );
  }
}
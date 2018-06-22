import { LinearProgress, TableCell, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';
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
  total: number;

  error?: any;
  loading: boolean;
}

export abstract class ListComponent<P = {}, S extends IStateList = IStateList<any>> extends PureComponent<P, S> {
  scrollTop: Function;
  isPaginatedData: boolean = false;

  abstract loadData: (params?: Partial<IPaginationParams>) => void;

  constructor(props: P, orderBy: string = null, orderDirection: string = 'asc') {
    super(props);
    this.state = {
      page: 0,
      pageSize: 10,
      orderBy,
      orderDirection,
      items: [],
      allItems: [],
      total: 0,
      loading: true
    } as any;
  }

  mergeParams = (params: Partial<IPaginationParams>): IPaginationParams => {
    const { term, page, pageSize, orderBy, orderDirection } = this.state;
    return { term, page, pageSize, orderBy, orderDirection, ...params };
  }

  setPaginatedData = (data: IPaginationResponse<S['items'][0]>) => {
    const { results, ...others } = data;
    this.isPaginatedData = true;

    this.setState({
      ...others,
      items: results,
      allItems: results,
      loading: false
    });
  }

  setAllItems = (allItems: S['allItems']): void => {
    const { page, pageSize } = this.state;
    this.isPaginatedData = false;

    this.setState({ allItems, total: allItems.length, loading: false });
    this.handlePaginate(page, pageSize);
  }

  handlePaginate = (page: number, pageSize: number): void => {
    const { allItems, loading } = this.state;
    if (loading) return;

    if (this.isPaginatedData) {
      this.loadData({ page, pageSize });
      this.scrollTop && this.scrollTop();
      return;
    }

    this.setState({
      items: allItems.slice(pageSize * page, (pageSize * page) + pageSize),
      pageSize,
      page,
      loading: false,
    });

    this.scrollTop && this.scrollTop();
  }

  handleTryAgain = () => {
    this.loadData();
  }

  handleSort = (column: string) => {
    const { orderBy, orderDirection, pageSize } = this.state;

    this.setState({
      orderBy: column,
      orderDirection: column === orderBy && orderDirection === 'asc' ? 'desc' : 'asc'
    }, () => this.handlePaginate(0, pageSize));
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
              <ErrorMessage error={error} tryAgain={this.handleTryAgain} />
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
    const { total, page, pageSize, loading } = this.state;

    return (
      <div style={loading ? { pointerEvents: 'none', opacity: 0.7 } : null}>
        <ScrollTopContext.Consumer>
          {scrollTop => (this.scrollTop = scrollTop) && null}
        </ScrollTopContext.Consumer>

        <TablePagination
          labelRowsPerPage='items por página'
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          component='div'
          count={total}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          page={page}
          onChangePage={(event, page) => this.handlePaginate(page, pageSize)}
          onChangeRowsPerPage={(event) => this.handlePaginate(page, Number(event.target.value))}
          {...props}
        />
      </div>
    );
  }

}

interface ITableCellSortableProps extends IStateList {
  column: string;
  children?: React.ReactNode;
  onChange: (columns: string) => void;
}

export function TableCellSortable(props: ITableCellSortableProps) {
  const { orderBy, orderDirection, onChange, column, loading } = props;
  return (
    <TableCell
      sortDirection={orderBy === column ? orderDirection : false}
    >
      <TableSortLabel
        disabled={loading}
        active={orderBy === column}
        direction={orderDirection}
        onClick={() => onChange(column)}
      >
        {props.children}
      </TableSortLabel>
    </TableCell>
  );
}
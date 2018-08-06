import {
  IconButton,
  InputAdornment,
  LinearProgress,
  TableCell,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { TableCellProps } from '@material-ui/core/TableCell';
import { LabelDisplayedRowsArgs, TablePaginationProps } from '@material-ui/core/TablePagination';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { ScrollTopContext } from 'components/Layout/AppWrapper';
import ErrorMessage from 'components/Shared/ErrorMessage';
import IconMessage from 'components/Shared/IconMessage';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import CreationIcon from 'mdi-react/CreationIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import React from 'react';
import { Fragment, PureComponent } from 'react';

export interface IStateList<T = any> extends IPaginationParams {
  items: T[];
  allItems: T[];
  total: number;

  error?: any;
  loading: boolean;
}

export abstract class ListComponent<P = {}, S extends IStateList = IStateList<any>> extends PureComponent<P, S> {
  scrollTop: Function;
  timeoutTerm: any;
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
    } as Readonly<S>;
  }

  get sortableProps() {
    const { loading, orderBy, orderDirection } = this.state;

    return {
      loading,
      currentColumn: orderBy,
      currentDirection: orderDirection,
      onChange: this.handleSort
    };
  }

  mergeParams = (params: Partial<IPaginationParams>): IPaginationParams => {
    const { term, page, pageSize, orderBy, orderDirection } = this.state;
    return { term, page, pageSize, orderBy, orderDirection, ...params };
  }

  setError = (error: any) => {
    this.setState({ error, items: [], allItems: [], loading: false });
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

  handlePaginate = (page: number, pageSize: number = this.state.pageSize): void => {
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

  handleSort = (column: string) => {
    const { orderBy, orderDirection, pageSize } = this.state;

    this.setState({
      orderBy: column,
      orderDirection: column === orderBy && orderDirection === 'asc' ? 'desc' : 'asc'
    }, () => this.handlePaginate(0, pageSize));
  }

  handleChangeTerm = (term: string) => {
    if (this.state.loading) return;

    this.setState({ term });
    clearTimeout(this.timeoutTerm);

    if (term && term.length < 3) return;

    this.timeoutTerm = setTimeout(() => this.loadData(), 500);
  }

  handleTryAgain = () => {
    this.loadData();
  }

  labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => `${from}-${to} de ${count}`;
  onChangePage = (event: any, page: number) => this.handlePaginate(page);
  onChangeRowsPerPage = (event: any) => this.handlePaginate(this.state.page, Number(event.target.value));

  renderSearch = (props: Partial<FieldText['props']> = {}) => {
    const { term } = this.state;

    return (
      <FieldText
        label='Pesquisar'
        value={term}
        onChange={this.handleChangeTerm}
        margin='none'
        placeholder='Digite ao menos 3 caracteres...'
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton disabled={true} style={{ marginRight: -15 }}>
                <MagnifyIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        {...props}
      />
    );
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
          labelRowsPerPage='items'
          labelDisplayedRows={this.labelDisplayedRows}
          component='div'
          count={total}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          page={page}
          onChangePage={this.onChangePage}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
          {...props}
        />
      </div>
    );
  }

}

interface ITableCellSortableProps extends TableCellProps {
  loading: boolean;
  currentColumn: string;
  currentDirection: 'asc' | 'desc';
  column: string;
  children?: React.ReactNode;
  onChange: (column: any) => void;
}

export class TableCellSortable extends PureComponent<ITableCellSortableProps> {
  onChange = () => {
    this.props.onChange(this.props.column);
  }

  render() {
    const { currentColumn, currentDirection, children, onChange, column, loading, ...extra } = this.props;

    return (
      <TableCell
        {...extra}
        sortDirection={currentColumn === column ? currentDirection : false}
      >
        <TableSortLabel
          disabled={loading}
          active={currentColumn === column}
          direction={currentDirection}
          onClick={this.onChange}
        >
          {children}
        </TableSortLabel>
      </TableCell>
    );
  }
}
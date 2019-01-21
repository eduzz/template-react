import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TablePagination, { LabelDisplayedRowsArgs, TablePaginationProps } from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { ScrollTopContext } from 'components/Pages/Admin';
import ErrorMessage from 'components/Shared/ErrorMessage';
import IconMessage from 'components/Shared/IconMessage';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import React from 'react';
import { Fragment, PureComponent } from 'react';

export interface IStateList<T = any> extends IPaginationParams {
  items: T[];
  search?: string;
  total_rows: number;
  total_pages: number;
  error?: any;
  loading: boolean;
}

export abstract class ListComponent<P = {}, S extends IStateList = IStateList<any>> extends PureComponent<P, S> {
  scrollTop: Function;
  timeoutTerm: any;

  abstract loadData: (params?: Partial<IPaginationParams>) => void;

  constructor(props: P, orderby: string = null, order: string = 'asc') {
    super(props);
    this.state = {
      page: 1,
      size: 10,
      order,
      orderby,
      items: [],
      total_rows: 0,
      loading: false
    } as Readonly<S>;
  }

  get sortableProps() {
    const { loading, order, orderby } = this.state;

    return {
      loading,
      currentColumn: orderby,
      currentDirection: order,
      onChange: this.handleSort
    };
  }

  handleRefresh = () => {
    this.loadData();
  }

  mergeParams = (params: Partial<IPaginationParams>): IPaginationParams => {
    const { page, size, order, orderby, search } = this.state;
    return { page, size, order, orderby, search, ...params };
  }

  setError = (error: any) => {
    this.setState({ error, items: [], loading: false });
  }

  setPaginatedData = (response: IPaginationResponse<S['items'][0]>) => {
    const { data, paginator } = response;

    this.setState({
      ...paginator,
      items: data,
      loading: false
    });
  }

  handlePaginate = (page: number, size: number = this.state.size): void => {
    const { loading } = this.state;

    if (loading) return;

    this.loadData({ page, size });
    this.scrollTop && this.scrollTop();
  }

  handleSort = (column: string) => {
    const { orderby, order, size } = this.state;

    this.setState({
      orderby: column,
      order: column === orderby && order === 'asc' ? 'desc' : 'asc'
    }, () => this.handlePaginate(1, size));
  }

  handleChangeTerm = (search: string) => {
    if (this.state.loading) return;

    this.setState({ search });
    clearTimeout(this.timeoutTerm);

    if (search && search.length < 5) return;

    this.timeoutTerm = setTimeout(() => this.loadData(), 1000);
  }

  handleTryAgain = () => {
    this.loadData();
  }

  labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => `${from}-${to} de ${count}`;
  onChangePage = (event: any, page: number) => this.handlePaginate(page + 1);
  onChangeRowsPerPage = (event: any) => this.handlePaginate(this.state.page, Number(event.target.value));

  renderSearch = (props: Partial<FieldText['props']> = {}) => {
    const { search } = this.state;

    return (
      <FieldText
        label='Pesquisar'
        value={search}
        onChange={this.handleChangeTerm}
        margin='none'
        placeholder='Digite ao menos 5 caracteres...'
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
              <IconMessage icon={AlertCircleOutlineIcon} message='Nenhum item cadastrado...' />
            </TableCell>
          </TableRow>
        }
      </Fragment>
    );
  }

  renderTablePagination = (props: Partial<TablePaginationProps> = {}) => {
    const { total_rows, page, size, loading } = this.state;

    return (
      <div style={loading ? { pointerEvents: 'none', opacity: 0.7 } : null}>
        <ScrollTopContext.Consumer>
          {scrollTop => (this.scrollTop = scrollTop) && null}
        </ScrollTopContext.Consumer>

        <TablePagination
          labelRowsPerPage='items'
          labelDisplayedRows={this.labelDisplayedRows}
          component='div'
          count={total_rows}
          rowsPerPage={size}
          rowsPerPageOptions={[10, 25, 50]}
          page={page - 1}
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
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

export interface IStateList<T = any, P extends IPaginationParams = IPaginationParams> {
  items: T[];
  allItems: T[];
  total: number;

  params: P;

  error?: any;
  loading: boolean;
}

export abstract class ListComponent<P = {}, S extends IStateList = IStateList<any>> extends PureComponent<P, S> {
  scrollTop: Function;
  timeoutTerm: any;
  isPaginatedData: boolean = false;

  abstract loadData: (params?: IStateList['params']) => void;

  constructor(props: P, orderBy: string = null, orderDirection: string = 'asc') {
    super(props);
    this.state = {
      params: {
        page: 0,
        pageSize: 10,
        orderBy,
        orderDirection
      },
      items: [],
      allItems: [],
      total: 0,
      loading: true
    } as Readonly<S>;
  }

  get sortableProps() {
    const {
      loading,
      params: { orderBy, orderDirection }
    } = this.state;

    return {
      loading,
      currentColumn: orderBy,
      currentDirection: orderDirection,
      onChange: this.handleSort
    };
  }

  mergeParams = (params: Partial<IStateList['params']>): IStateList['params'] => {
    return { ...this.state.params, ...params };
  };

  setError = (error: any) => {
    this.setState({ error, items: [], allItems: [], loading: false });
  };

  setPaginatedData = (data: IPaginationResponse<S['items'][0]>) => {
    const { results, total, ...others } = data;
    this.isPaginatedData = true;

    this.setState({
      total,
      params: { ...others },
      items: results,
      allItems: results,
      loading: false
    });
  };

  setAllItems = (allItems: S['allItems']): void => {
    let {
      params: { page, pageSize }
    } = this.state;
    this.isPaginatedData = false;

    if (page === 0) {
      page++;
    }

    this.setState({ allItems, total: allItems.length, loading: false });
    this.handlePaginate(page, pageSize);
  };

  handlePaginate = (page: number, pageSize: number = this.state.params.pageSize): void => {
    const { allItems, loading } = this.state;
    if (loading) return;

    if (this.isPaginatedData) {
      this.loadData({ page, pageSize });
      this.scrollTop && this.scrollTop();
      return;
    }

    this.setState({
      items: allItems.slice(pageSize * page, pageSize * page + pageSize),
      params: { ...this.state.params, page, pageSize },
      loading: false
    });

    this.scrollTop && this.scrollTop();
  };

  handleSort = (column: string) => {
    const {
      params: { orderBy, orderDirection, pageSize }
    } = this.state;

    this.setState(
      {
        params: {
          ...this.state.params,
          orderBy: column,
          orderDirection: column === orderBy && orderDirection === 'asc' ? 'desc' : 'asc'
        }
      },
      () => this.handlePaginate(0, pageSize)
    );
  };

  handleChangeTerm = (term: string) => {
    if (this.state.loading) return;

    this.setState({ params: { ...this.state.params, term } });
    clearTimeout(this.timeoutTerm);

    if (term && term.length < 3) return;

    this.timeoutTerm = setTimeout(() => this.loadData(), 500);
  };

  handleTryAgain = () => {
    this.loadData();
  };

  labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => `${from}-${to} de ${count}`;
  onChangePage = (event: any, page: number) => this.handlePaginate(page + 1);
  onChangeRowsPerPage = (event: any) => this.handlePaginate(this.state.params.page, Number(event.target.value));

  renderSearch = (props: Partial<FieldText['props']> = {}) => {
    const {
      params: { term }
    } = this.state;

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
        ref={null}
      />
    );
  };

  renderLoader = () => {
    const { loading } = this.state;

    return <div style={{ height: 5 }}>{loading && <LinearProgress color='secondary' />}</div>;
  };

  renderEmptyAndErrorMessages = (numberOfcolumns: number) => {
    const { error, items, loading } = this.state;

    return (
      <Fragment>
        {loading && !items.length && (
          <TableRow>
            <TableCell className='empty' colSpan={numberOfcolumns}>
              Carregando...
            </TableCell>
          </TableRow>
        )}
        {error && !loading && (
          <TableRow>
            <TableCell colSpan={numberOfcolumns} className='error'>
              <ErrorMessage error={error} tryAgain={this.handleTryAgain} />
            </TableCell>
          </TableRow>
        )}
        {!error && !items.length && !loading && (
          <TableRow>
            <TableCell colSpan={numberOfcolumns}>
              <IconMessage icon={AlertCircleOutlineIcon} message='Nenhum item cadastrado...' />
            </TableCell>
          </TableRow>
        )}
      </Fragment>
    );
  };

  renderTablePagination = (props: Partial<TablePaginationProps> = {}) => {
    const {
      total,
      params: { page, pageSize },
      loading
    } = this.state;

    return (
      <div style={loading ? { pointerEvents: 'none', opacity: 0.7 } : null}>
        <ScrollTopContext.Consumer>{scrollTop => (this.scrollTop = scrollTop) && null}</ScrollTopContext.Consumer>

        <TablePagination
          labelRowsPerPage='items'
          labelDisplayedRows={this.labelDisplayedRows}
          count={total}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          page={page - 1}
          component={'div' as any}
          onChangePage={this.onChangePage}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
          {...props}
        />
      </div>
    );
  };
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
  };

  render() {
    const { currentColumn, currentDirection, children, column, loading, ...extra } = this.props;

    return (
      <TableCell {...extra} onChange={null} sortDirection={currentColumn === column ? currentDirection : false}>
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

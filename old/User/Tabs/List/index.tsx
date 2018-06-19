import {
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import ErrorMessage from 'components/ErrorMessage';
import IconMessage from 'components/IconMessage';
import TableWrapper from 'components/TableWrapper';
import { IUser } from 'interfaces/user';
import CreationIcon from 'mdi-react/CreationIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { requestUserList } from 'store/actionCreators/user';

import ListItem from './ListItem';

interface IState {
  pageSize: number;
  page: number;
  items: IUser[];
}

interface IPropsFromConnect {
  loading: boolean;
  error: any;
  all: IUser[];
  requestUserList?: typeof requestUserList;
}

class UserTabList extends Component<IPropsFromConnect, IState> {
  constructor(props: IPropsFromConnect) {
    super(props);
    this.state = { page: 0, pageSize: 10, items: [] };
  }

  static getDerivedStateFromProps(nextProps: IPropsFromConnect, currentState: IState) {
    const { page, pageSize } = currentState;

    return {
      ...currentState,
      items: nextProps.all.slice(pageSize * page, (pageSize * page) + pageSize)
    };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    this.props.requestUserList();
  }

  paginate(page: number, pageSize: number): void {
    const { all, loading } = this.props;
    if (loading) return;

    this.setState({
      items: all.slice(pageSize * page, (pageSize * page) + pageSize),
      pageSize,
      page
    });
  }

  render() {
    const { items, pageSize, page } = this.state;
    const { loading, all, error } = this.props;

    return (
      <Paper>
        {loading && <LinearProgress color='secondary' />}
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Curso</TableCell>
                <TableCell>Grupo</TableCell>
                <TableCell>
                  <IconButton onClick={() => this.load()}>
                    <RefreshIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error &&
                <TableRow>
                  <TableCell colSpan={5} className='error'>
                    <ErrorMessage error={error} tryAgain={() => this.load()} />
                  </TableCell>
                </TableRow>
              }
              {!error && !items.length &&
                <TableRow>
                  <TableCell colSpan={5}>
                    <IconMessage icon={CreationIcon} message='Nenhum usuário criado' />
                  </TableCell>
                </TableRow>
              }
              {items.map(user =>
                <ListItem key={user.id} user={user} />
              )}
            </TableBody>
          </Table>
        </TableWrapper>
        <TablePagination
          labelRowsPerPage='items por página'
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          component='div'
          count={all.length}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          page={page}
          onChangePage={(event, page) => this.paginate(page, pageSize)}
          onChangeRowsPerPage={(event) => this.paginate(page, Number(event.target.value))}
        />
      </Paper >
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}) => {
  return {
    ...ownProps,
    loading: state.user.isFetching,
    all: state.user.users,
    error: state.user.error
  } as IPropsFromConnect;
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
  requestUserList
})(UserTabList);
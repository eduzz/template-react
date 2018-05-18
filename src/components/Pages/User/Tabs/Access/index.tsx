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
import { IAccessGroup } from 'interfaces/accessGroup';
import { CreationIcon, RefreshIcon } from 'mdi-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { requestAccessGroupList } from 'store/actionCreators/accessGroup';

import ListItem from './ListItem';

interface IState {
  pageSize: number;
  page: number;
  items: IAccessGroup[];
}

interface IPropsFromConnect {
  loading: boolean;
  error: any;
  all: IAccessGroup[];
  requestAccessGroupList?: typeof requestAccessGroupList;
}

class UserTabAccess extends Component<IPropsFromConnect, IState> {
  constructor(props: IPropsFromConnect) {
    super(props);
    this.state = { page: 0, pageSize: 10, items: [] };
  }

  static getDerivedStateFromProps(nextProps: IPropsFromConnect, currentState: IState): IState {
    const { page, pageSize } = currentState;

    return {
      ...currentState,
      items: nextProps.all.slice(pageSize * page, (pageSize * page) + pageSize)
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.props.requestAccessGroupList();
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
                <TableCell style={{ width: 80 }}>#</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>
                  <IconButton onClick={() => this.refresh()}>
                    <RefreshIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error &&
                <TableRow>
                  <TableCell colSpan={3} className='error'>
                    <ErrorMessage error={error} tryAgain={() => this.refresh()} />
                  </TableCell>
                </TableRow>
              }
              {!error && !items.length &&
                <TableRow>
                  <TableCell colSpan={3}>
                    <IconMessage icon={CreationIcon} message='Nenhum grupo criado' />
                  </TableCell>
                </TableRow>
              }
              {items.map(accessGroup =>
                <ListItem key={accessGroup.id} accessGroup={accessGroup} />
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
    loading: state.accessGroup.isFetching,
    all: state.accessGroup.accessGroups,
    error: state.accessGroup.error
  } as IPropsFromConnect;
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
  requestAccessGroupList
})(UserTabAccess);
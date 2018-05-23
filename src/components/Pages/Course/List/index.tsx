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
import FabButton from 'components/FabButton';
import IconMessage from 'components/IconMessage';
import { RouterContext } from 'components/Router';
import TableWrapper from 'components/TableWrapper';
import Toolbar from 'components/Toolbar';
import { ICourse } from 'interfaces/course';
import { IPaginationResponse } from 'interfaces/pagination';
import { CreationIcon, PlusIcon, RefreshIcon } from 'mdi-react';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { requestCourseList } from 'store/actionCreators/course';

import { ScrollTopContext } from '../../../AppWrapper';
import ListItem from './ListItem';

interface IState {
}

interface IPropsFromConnect {
  loading: boolean;
  error: any;
  items: ICourse[];
  pagination: IPaginationResponse;
  requestCourseList?: typeof requestCourseList;
}

class CourseListPage extends Component<IPropsFromConnect, IState> {
  scrollTop: Function;

  constructor(props: IPropsFromConnect) {
    super(props);
    this.state = { page: 0, pageSize: 10 };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    this.props.requestCourseList(this.props.pagination);
  }

  paginate(page: number, size: number): void {
    this.props.requestCourseList({ page, size });
    this.scrollTop();
  }

  render() {
    const { loading, items, pagination, error } = this.props;

    return (
      <Fragment>
        <Toolbar title='Cursos' />

        <ScrollTopContext.Consumer>
          {scrollTop => (this.scrollTop = scrollTop) && null}
        </ScrollTopContext.Consumer>

        <RouterContext.Consumer>
          {getRouter =>
            <FabButton actions={[{
              icon: PlusIcon,
              tooltip: 'Novo curso',
              onClick: () => getRouter().navigate('/course/new')
            }]} />
          }
        </RouterContext.Consumer>

        <Paper>
          {loading && <LinearProgress color='secondary' />}
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Categoria</TableCell>
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
                      <IconMessage icon={CreationIcon} message='Nenhum curso criado' />
                    </TableCell>
                  </TableRow>
                }
                {items.map(course =>
                  <ListItem key={course.id} course={course} />
                )}
              </TableBody>
            </Table>
          </TableWrapper>
          <TablePagination
            labelRowsPerPage='items por página'
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            component='div'
            count={pagination.totalRows}
            rowsPerPage={pagination.size}
            rowsPerPageOptions={[10, 25, 50]}
            page={pagination.page - 1}
            onChangePage={(event, page) => this.paginate(page + 1, pagination.size)}
            onChangeRowsPerPage={(event) => this.paginate(pagination.page + 1, Number(event.target.value))}
          />
        </Paper>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}): IPropsFromConnect => {
  return {
    loading: state.course.isFetching,
    items: state.course.courses,
    error: state.course.error,
    pagination: state.course.pagination
  } as IPropsFromConnect;
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
  requestCourseList
})(CourseListPage);
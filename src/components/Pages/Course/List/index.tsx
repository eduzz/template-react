import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { IStateList, ListComponent } from 'components/Abstract/List';
import { ScrollTopContext } from 'components/AppWrapper';
import FabButton from 'components/FabButton';
import { RouterContext } from 'components/Router';
import TableWrapper from 'components/TableWrapper';
import Toolbar from 'components/Toolbar';
import { ICourse } from 'interfaces/course';
import { IPaginationParams } from 'interfaces/pagination';
import PlusIcon from 'mdi-react/PlusIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React, { Fragment } from 'react';
import rxjsOperators from 'rxjs-operators';
import courseService from 'services/course';

import ListItem from './ListItem';

interface IState extends IStateList<ICourse> {
}

export default class CourseListPage extends ListComponent<{}, IState> {
  componentDidMount() {
    this.loadData();
  }

  loadData = (params?: Partial<IPaginationParams>) => {
    this.setState({ loading: true });

    courseService.list(this.mergeParams(params)).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(items => {
      this.setAllItems(items);
    }, error => {
      this.setState({ error, loading: false });
    });
  }

  handleTryAgain = () => {
    this.loadData();
  }

  handleDelete = () => {
    this.loadData();
  }

  render() {
    const { items } = this.state;

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
          {this.renderLoader()}
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>
                    <IconButton onClick={() => this.loadData()}>
                      <RefreshIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderEmptyAndErrorMessages(3)}
                {items.map(course =>
                  <ListItem key={course.id} course={course} onDelete={this.handleDelete} />
                )}
              </TableBody>
            </Table>
          </TableWrapper>
          {this.renderTablePagination()}
        </Paper>
      </Fragment>
    );
  }
}
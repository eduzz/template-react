import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { IStateList, ListComponent } from 'components/Abstract/List';
import ErrorMessage from 'components/Shared/ErrorMessage';
import Loading from 'components/Shared/Loading';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import { IStudent } from 'interfaces/models/student';
import { IPaginationParams } from 'interfaces/pagination';
import React, { Fragment } from 'react';
import Rx from 'rxjs';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

import StudentItem from './StudentItem';

interface IProps extends IStyledProps {
}

interface IState extends IStateList<IStudent> {
}

@WithStyles(theme => ({
  empty: {
    fontSize: 12,
    padding: '48px 0',
    textTransform: 'uppercase',
  },
}))
export default class StudentList extends ListComponent<IProps, IState> {
  sizes = [5, 10, 15];
  listSubscripition: Rx.Subscription;

  componentDidMount() {
    this.loadData();
  }

  loadData = (params?: IPaginationParams) => {
    this.setState({ error: null, loading: true });

    this.listSubscripition && this.listSubscripition.unsubscribe();
    this.listSubscripition = studentService.getStudents(this.mergeParams(params)).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(({ updating, data }) => {
      if (updating) {
        this.setState({ loading: true });
        return;
      }

      this.setPaginatedData(data);
    }, error => this.setState({ error, loading: false }));
  }

  render() {
    const { items, error, loading } = this.state;
    const { classes } = this.props;

    if (error) {
      return (
        <CardContent>
          <ErrorMessage error={error} tryAgain={this.loadData} />
        </CardContent>
      );
    }

    if (!loading && !items.length) {
      return <Typography variant='subtitle1' align='center' className={classes.empty}><strong>Nenhum aluno encontrado!</strong></Typography>;
    }

    return (
      <Fragment>
        <List disablePadding>
          {items.map(student =>
            <StudentItem key={student.id} student={student} />
          )}
          <ListItem>
            <Grid container justify='center'>
              <Grid item>
                {loading &&
                  <Loading />
                }

                {this.renderTablePagination()}
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Fragment>
    );
  }
}
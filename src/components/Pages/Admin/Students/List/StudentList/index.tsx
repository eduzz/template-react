import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from 'components/Shared/ErrorMessage';
import Loading from 'components/Shared/Loading';
import React, { Fragment, PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import studentService, { IStudentListResult } from 'services/student';

import StudentItem from './StudentItem';

interface IProps {
}

interface IState extends IStudentListResult {
  isFetching: boolean;
}

export default class StudentList extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isFetching: true };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ error: null });

    studentService.getStudents().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(result => {
      this.setState({ ...result, isFetching: false });
    }, error => this.setState({ error, isFetching: false }));
  }

  handleLoadMore = () => {
    this.setState({ isFetching: true });
    studentService.loadMoreStudents();
  }

  render() {
    const { students, hasMore, error, isFetching } = this.state;

    if (error) {
      return (
        <CardContent>
          <ErrorMessage error={error} tryAgain={this.loadData} />
        </CardContent>
      );
    }

    if (!students) {
      return <Loading />;
    }

    if (!students.length) {
      return <Typography variant='subtitle1' align='center'><strong>Nenhum aluno encontrado!</strong></Typography>;
    }

    return (
      <Fragment>
        <List disablePadding>
          {students.map(student =>
            <StudentItem key={student.id} student={student} />
          )}
          <ListItem>
            <Grid container justify='center'>
              <Grid item>
                {isFetching &&
                  <Loading />
                }

                {!isFetching && hasMore &&
                  <Button variant='outlined' color='secondary' onClick={this.handleLoadMore}>
                    Mostrar mais alunos
                  </Button>
                }
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Fragment>
    );
  }
}
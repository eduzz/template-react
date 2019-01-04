import React, { PureComponent, Fragment } from 'react';
import List from '@material-ui/core/List';
import { IStudent } from 'interfaces/models/student';
import StudentItem from './StudentItem';
import studentService from 'services/student';
import rxjsOperators from 'rxjs-operators';
import Loading from 'components/Shared/Loading';
import CardContent from '@material-ui/core/CardContent';
import ErrorMessage from 'components/Shared/ErrorMessage';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

interface IProps {

}

interface IState {
  students: IStudent[];
  error?: any;
  isFetching: boolean;
}

export default class StudentList extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      students: null,
      isFetching: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({
      error: null,
    });

    studentService.getStudents().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(students => {
      this.setState({
        students,
        error: null,
        isFetching: false,
      });
    }, error => {
      this.setState({
        error,
        isFetching: false,
      });
    });
  }

  handleLoadMore = () => {
    this.setState({
      isFetching: true,
    });

    studentService.loadMoreStudents();
  }

  render() {
    const { students, error, isFetching } = this.state;

    if (!!error)
      return (
        <CardContent>
          <ErrorMessage error={error} tryAgain={this.loadData} />
        </CardContent>
      );

    if (!students)
      return <Loading />;

    if (!students.length)
      return <Typography variant='subtitle1' align='center'><strong>Nenhum aluno encontrado!</strong></Typography>;

    return (
      <Fragment>
        <List disablePadding>
          {students.map((student, index) =>
            <StudentItem key={index} student={student} />
          )}
        </List>
        <ListItem>
          <Grid container justify='center'>
            <Grid item>
              {isFetching ?
                <Loading />
                :
                studentService.hasMoreStudents() && <Button variant='outlined' onClick={this.handleLoadMore}>Mostrar mais alunos</Button>
              }
            </Grid>
          </Grid>
        </ListItem>
      </Fragment>
    );
  }
}
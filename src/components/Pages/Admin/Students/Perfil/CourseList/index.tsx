import React, { PureComponent, SyntheticEvent, Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import Typography from '@material-ui/core/Typography';
import studentService from 'services/student';
import rxjsOperators from 'rxjs-operators';
import { WithRouter } from 'decorators/withRouter';
import { IStudentCourse } from 'interfaces/models/student';
import CardContent from '@material-ui/core/CardContent';
import ErrorMessage from 'components/Shared/ErrorMessage';
import List from '@material-ui/core/List';
import Loading from 'components/Shared/Loading';
import CourseItem from './CourseItem';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

interface IProps {
  classes?: any;
  history?: any;
  match?: any;
}

interface IState {
  courses: IStudentCourse[];
  error?: any;
}

@WithRouter()
@WithStyles(theme => ({
  header: {
    paddingRight: 49,
    paddingLeft: 0,
    paddingBottom: 0,
  },
  headerCourse: {
    marginRight: 51,
  },
  headerProgress: {
    marginRight: 100,
  },
}))
export default class CourseList extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      courses: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({
      error: null,
      courses: null,
    });

    studentService.getStudentCourses(this.props.match.params.id).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(courses => {
      this.setState({
        courses,
        error: null,
      });
    }, error => {
      this.setState({
        error,
      });
    });
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = null;
  }

  render() {
    const { classes } = this.props;
    const { courses, error } = this.state;

    if (!!error)
      return (
        <CardContent>
          <ErrorMessage error={error} tryAgain={this.loadData} />
        </CardContent>
      );

    if (!courses)
      return <Loading />;

    if (!courses.length)
      return <Typography variant='subtitle1' align='center'><strong>Este aluno não possui cursos!</strong></Typography>;

    return (
      <Fragment>
        <List disablePadding>
          <Hidden smDown>
            <ListItem className={classes.header}>
              <Grid container alignItems='center' spacing={16} wrap='nowrap'>
                <Grid item xs={4} className={classes.headerCourse}>
                  <Typography variant='subtitle1'>Curso</Typography>
                </Grid>
                <Grid item xs={true}>
                  <Typography variant='subtitle1'>Matrícula</Typography>
                </Grid>
                <Grid item xs='auto' className={classes.headerProgress}>
                  <Typography variant='subtitle1'>% Progresso</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Hidden>

          {courses.map((course, index) =>
            <CourseItem key={index} course={course} />
          )}
        </List>
      </Fragment>
    );
  }
}
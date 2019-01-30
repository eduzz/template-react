import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from 'components/Shared/ErrorMessage';
import Loading from 'components/Shared/Loading';
import { IRouteProps, WithRouter } from 'decorators/withRouter';
import { IStudentCourse } from 'interfaces/models/student';
import React, { Fragment, PureComponent, SyntheticEvent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

import CourseItem from './CourseItem';

interface IProps extends IRouteProps {
}

interface IState {
  loading: boolean;
  courses: IStudentCourse[];
  error?: any;
}

@WithRouter()
export default class CourseList extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { loading: true, courses: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ error: null, loading: true });

    studentService.getStudentCourses(this.props.match.params.id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(({ updating, data }) => {
      this.setState({ loading: updating, courses: data || [] });
    }, error => this.setState({ error, loading: false }));
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = null;
  }

  render() {
    const { courses, error, loading } = this.state;

    return (
      <Fragment>
        <CardContent>
          <Typography variant='h6'>Cursos Matriculados</Typography>
        </CardContent>

        {loading && <Loading />}

        {!loading && !courses.length &&
          <Typography variant='subtitle1' align='center'>
            <strong>Este aluno não possui cursos</strong>
          </Typography>
        }

        {!loading && !!error &&
          <CardContent>
            <ErrorMessage error={error} tryAgain={this.loadData} />
          </CardContent>
        }

        {!loading && !error && !!courses.length &&
          <List disablePadding>
            {courses.map((course, index) =>
              <CourseItem key={index} course={course} />
            )}
          </List>
        }
      </Fragment>
    );
  }
}
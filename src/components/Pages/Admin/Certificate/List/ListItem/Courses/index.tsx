import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorMessage from 'components/Shared/ErrorMessage';
import IconMessage from 'components/Shared/IconMessage';
import { WithStyles } from 'decorators/withStyles';
import { ICertificate, ICertificateCourse } from 'interfaces/models/certificate';
import CreationIcon from 'mdi-react/CreationIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import CourseItem from './CourseItem';

interface IState {
  error?: any;
  courses?: ICertificateCourse[];
}

interface IProps {
  classes?: any;
  certificate: ICertificate;
}

@WithStyles({
  loader: {
    textAlign: 'center',
    padding: 20
  }
})
export default class Courses extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses = () => {
    this.setState({ courses: null, error: null });

    certificateService.getCourses(this.props.certificate.id).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(courses => {
      this.setState({ courses });
    }, error => this.setState({ error }));
  }

  render() {
    const { error, courses } = this.state;
    const { classes, certificate } = this.props;

    return (
      <Fragment>
        {!!error &&
          <ErrorMessage error={error} tryAgain={this.loadCourses} />
        }

        {!!courses && !courses.length &&
          <IconMessage icon={CreationIcon} message='Nenhum curso adicionado' />
        }

        {!courses && !error &&
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        }

        {!!courses && courses.map(course =>
          <CourseItem key={course.id} certificateId={certificate.id} course={course} />
        )}
      </Fragment>
    );
  }
}
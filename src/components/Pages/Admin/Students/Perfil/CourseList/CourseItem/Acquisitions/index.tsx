import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorMessage from 'components/Shared/ErrorMessage';
import IconMessage from 'components/Shared/IconMessage';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import { IStudentCourse, IStudentCourseAcquisition } from 'interfaces/models/student';
import CreationIcon from 'mdi-react/CreationIcon';
import React, { Fragment, PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

import AcquisitionItem from './AcquisitionItem';

interface IState {
  error?: any;
  acquisitions?: IStudentCourseAcquisition[];
}

interface IProps extends IStyledProps {
  studentId: number;
  data: IStudentCourse;
}

@WithStyles({
  loader: {
    textAlign: 'center',
    padding: 20
  }
})
export default class Acquisitions extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses = () => {
    this.setState({ acquisitions: null, error: null });

    studentService.getStudentCourseAcquisitions(this.props.studentId, this.props.data.id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(({ data }) => {
      this.setState({ acquisitions: data });
    }, error => this.setState({ error }));
  }

  render() {
    const { error, acquisitions } = this.state;
    const { classes, data, studentId } = this.props;

    return (
      <Fragment>
        {!!error &&
          <ErrorMessage error={error} tryAgain={this.loadCourses} />
        }

        {!!acquisitions && !acquisitions.length &&
          <IconMessage icon={CreationIcon} message='Nenhum conteúdo encontrado' />
        }

        {!acquisitions && !error &&
          <div className={classes.loader}>
            <CircularProgress color='secondary' />
          </div>
        }

        {!!acquisitions && acquisitions.map(acquisition =>
          <AcquisitionItem
            key={acquisition.id}
            studentId={studentId}
            data={acquisition}
            course={data}
          />
        )}

      </Fragment>
    );
  }
}
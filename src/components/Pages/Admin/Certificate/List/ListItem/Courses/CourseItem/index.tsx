import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Confirm from 'components/Shared/Confirm';
import ErrorMessageIcon from 'components/Shared/ErrorMessageIcon';
import { ICertificateCourse } from 'interfaces/models/certificate';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { Fragment, PureComponent, SyntheticEvent } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

interface IState {
  loading: boolean;
  error?: any;
}

interface IProps {
  certificateId: number;
  course: ICertificateCourse;
}

export default class CourseItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { loading: false };
  }

  handleDelete = async (e: SyntheticEvent) => {
    e.stopPropagation();
    const { course, certificateId } = this.props;

    const confirm = await Confirm.show(`Deseja remover o curso ${course.title}?`);
    if (!confirm) return;

    this.setState({ loading: true });

    certificateService.removeCourse(certificateId, course).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => { }, error => this.setState({ error, loading: false }));
  }

  handleDismisError = () => {
    this.setState({ error: null });
  }

  render() {
    const { loading, error } = this.state;
    const { course } = this.props;

    return (
      <Fragment>
        <Grid container spacing={16} alignItems='center'>
          <Grid item xs={true}>
            <Typography>{course.title}</Typography>
          </Grid>
          <Grid item xs={false}>
            {loading &&
              <IconButton disabled={true}>
                <CircularProgress size={20} />
              </IconButton>
            }

            {!!error &&
              <ErrorMessageIcon error={error} onDismiss={this.handleDismisError} />
            }

            {!loading && !error &&
              <IconButton onClick={this.handleDelete}>
                <TrashCanIcon />
              </IconButton>
            }

          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
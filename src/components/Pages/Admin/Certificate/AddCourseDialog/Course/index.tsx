import { CircularProgress, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ErrorMessageIcon from 'components/Shared/ErrorMessageIcon';
import { WithStyles } from 'decorators/withStyles';
import { ICertificateCourse } from 'interfaces/models/certificate';
import CheckIcon from 'mdi-react/CheckIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import TrashIcon from 'mdi-react/TrashIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import Snackbar from '../../../../../Shared/Snackbar';

interface IState {
  loading: boolean;
  has_selected: boolean;
  error?: any;
}

interface IProps {
  classes?: any;
  certificateId: number;
  course: ICertificateCourse;
}

@WithStyles({
  container: {
    padding: '5px 0'
  },
  courseTitle: {
    wordBreak: 'break-all'
  },
  conditionalButton: {
    '& .negativeIcon': {
      display: 'none'
    },
    '&:hover .negativeIcon': {
      display: 'inline-block'
    },
    '&:hover .positiveIcon': {
      display: 'none'
    }
  }
})
export class AddCourseItemDialog extends PureComponent<IProps, IState> {
  unmounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      has_selected: props.course.has_selected
    };
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  handleDismisError = () => {
    this.setState({ error: null });
  }

  toogleSelected = () => {
    const { certificateId, course } = this.props;
    const { has_selected } = this.state;

    this.setState({ loading: true, error: null });

    const stream$ = !has_selected ?
      certificateService.addCourse(certificateId, course) :
      certificateService.removeCourse(certificateId, course);

    stream$.pipe(
      rxjsOperators.logError(),
      // rxjsOperators.bindComponent(this) removi de proposito
    ).subscribe(() => {
      if (this.unmounted) {
        Snackbar.show(`${course.title} adicionado`);
        return;
      }

      this.setState({ loading: false, has_selected: !has_selected });
    }, error => {
      if (this.unmounted) {
        Snackbar.error(`Não adicionar o curso ${course.title}`);
        return;
      }

      this.setState({ error, loading: false });
    });
  }

  render() {
    const { loading, error, has_selected } = this.state;
    const { course, classes } = this.props;

    return (
      <Fragment>
        <Grid container className={classes.container} alignItems='center'>
          <Grid item xs={true}>
            <Typography className={classes.courseTitle}>
              {course.title}
            </Typography>
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

            {!loading && !error && !has_selected &&
              <IconButton onClick={this.toogleSelected}>
                <PlusIcon />
              </IconButton>
            }

            {!loading && !error && !!has_selected &&
              <IconButton className={classes.conditionalButton} onClick={this.toogleSelected}>
                <CheckIcon className='positiveIcon' />
                <TrashIcon className='negativeIcon' />
              </IconButton>
            }
          </Grid>
        </Grid>

        <Divider />
      </Fragment>
    );
  }
}
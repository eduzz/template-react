import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Slide } from '@material-ui/core';
import FieldText from '@react-form-fields/material-ui/components/Text';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { ICertificateCourse } from 'interfaces/models/certificate';
import * as React from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import { AddCourseItemDialog } from './Course';

interface IState {
  certificateId?: number;
  search: string;
  opened: boolean;
  loading: boolean;
  error?: any;
  courses: ICertificateCourse[];
}

interface IProps {
  classes?: any;
}

@WithStyles({
  content: {
    width: 700,
    maxWidth: 'calc(95vw - 50px)'
  }
})
export default class AddCourseDialog extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      certificateId: 8,
      search: '',
      opened: false,
      loading: false,
      courses: []
    };
  }

  componentDidMount() {
    certificateService.shouldOpenAddCourse().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(certificateId => {
      this.setState({ opened: !!certificateId, certificateId });
    });
  }

  onOpen = () => {
    this.onSearchChange();
  }

  onCancel = () => {
    certificateService.closeAddCourse();
  }

  onExit = () => {
    this.setState({ search: '', courses: [] });
  }

  onSearchChange = (search: string = this.state.search) => {
    this.setState({ search });

    if (search.length !== 0 && search.length < 3) {
      return;
    }

    this.setState({ loading: true, error: null });

    certificateService.searchCourses(this.state.certificateId, search).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(courses => {
      this.setState({ courses, loading: false });
    }, error => this.setState({ error, loading: false }));
  }

  render() {
    const { opened, loading, search, error, courses, certificateId } = this.state;
    const { classes } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={opened}
        maxWidth={false}
        TransitionComponent={Transition}
        onEnter={this.onOpen}
        onExit={this.onExit}
      >

        {loading && <LinearProgress color='secondary' />}

        <DialogTitle>
          <FieldText
            placeholder='Vincular Curso'
            value={search}
            validation='string|min:3'
            onChange={this.onSearchChange}
            margin='none'
          />
        </DialogTitle>

        <DialogContent className={classes.content}>

          {!!error &&
            <ErrorMessage error={error} />
          }

          {!error && courses.map(course =>
            <AddCourseItemDialog key={course.id} certificateId={certificateId} course={course} />
          )}
        </DialogContent>

        <DialogActions>
          <Button color='secondary' onClick={this.onCancel}>OK</Button>
        </DialogActions>

      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
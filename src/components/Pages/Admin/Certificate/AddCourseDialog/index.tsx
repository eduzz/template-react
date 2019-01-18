import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import FieldText from '@react-form-fields/material-ui/components/Text';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { ICertificateCourse } from 'interfaces/models/certificate';
import * as React from 'react';
import * as Rx from 'rxjs';
import RxOp from 'rxjs-operators';
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
  search$: Rx.Subject<string>;

  constructor(props: IProps) {
    super(props);

    this.search$ = new Rx.Subject();

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
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(certificateId => {
      this.setState({ opened: !!certificateId, certificateId });
    });

    this.search$.pipe(
      RxOp.debounceTime(500),
      RxOp.filter(search => search.length === 0 || search.length >= 3),
      RxOp.tap(() => this.setState({ loading: true, error: null })),
      RxOp.switchMap((search) => certificateService.searchCourses(this.state.certificateId, search)),
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(courses => {
      this.setState({ courses, loading: false });
    }, error => this.setState({ error, loading: false }));
  }

  onOpen = () => {
    this.onSearchChange('');
  }

  onCancel = () => {
    certificateService.closeAddCourse();
  }

  onExit = () => {
    this.setState({ courses: [] });
  }

  onSearchChange = (search: string = this.state.search) => {
    this.search$.next(search);
    this.setState({ search });
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
            placeholder='Digite o nome do curso'
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
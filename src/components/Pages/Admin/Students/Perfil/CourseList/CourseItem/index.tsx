import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Avatar from 'components/Shared/Avatar';
import { WithRouter } from 'decorators/withRouter';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import { IStudentCourse } from 'interfaces/models/student';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import React, { PureComponent, SyntheticEvent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

import Acquisitions from './Acquisitions';

interface IProps extends IStyledProps {
  data: IStudentCourse;
  match?: any;
}

interface IState {
  progress: number;
  expanded: boolean;
  firstExpanded: boolean;
}

@WithRouter()
@WithStyles(theme => ({
  title: {
    wordBreak: 'break-word'
  },
  avatar: {
    width: 44,
    height: 44
  },
  progressNumber: {
    width: 40,
    textAlign: 'right'
  },
  progress: {
    width: 180,
    maxWidth: 'calc(100vw - 160px)'
  },
  padding: {
    padding: '8px 8px 8px 24px'
  }
}))
export default class CourseItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      progress: null,
      expanded: false,
      firstExpanded: false
    };
  }

  get id(): number {
    return this.props.match.params.id;
  }

  componentDidMount() {
    const { id, type } = this.props.data;

    studentService.getStudentCourseProgress(this.id, id, type).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(progress => {
      this.setState({ progress });
    });
  }

  handleChange = (event: SyntheticEvent, expanded: boolean) => {
    this.setExpanded(expanded);
  }

  setExpanded = (expanded: boolean) => {
    this.setState({
      expanded,
      firstExpanded: expanded || this.state.firstExpanded
    });
  }

  render() {
    const { classes, data } = this.props;
    const { expanded, progress, firstExpanded } = this.state;

    return (
      <ExpansionPanel elevation={0} expanded={expanded} onChange={this.handleChange}>
        <ExpansionPanelSummary expandIcon={<ChevronDownIcon />}>
          <Grid container wrap='nowrap' alignItems='center' spacing={16}>
            <Hidden xsDown>
              <Grid item sm={'auto'}>
                <Avatar className={classes.avatar} src={data.avatar} />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={true}>
              <Typography variant='body1' className={classes.title}>{data.title}</Typography>
              <Hidden smUp>
                <CourseProgress progress={progress} classes={classes} />
              </Hidden>
            </Grid>
            <Hidden xsDown>
              <Grid item xs='auto'>
                <CourseProgress progress={progress} classes={classes} />
              </Grid>
            </Hidden>
          </Grid>

        </ExpansionPanelSummary>

        <Divider />

        <ExpansionPanelDetails className={classes.padding}>
          {firstExpanded &&
            <Acquisitions studentId={this.id} data={data} />
          }
        </ExpansionPanelDetails>

      </ExpansionPanel>
    );
  }
}

function CourseProgress({ progress, classes }: { progress: number, classes: any }) {
  return (
    <Grid wrap='nowrap' container alignItems='center' spacing={8}>
      <Grid item className={classes.progressNumber}>
        {progress !== null &&
          <Typography variant='subtitle2' color='inherit'>{progress}%</Typography>
        }
      </Grid>
      <Grid item>
        <LinearProgress
          variant={progress === null ? 'indeterminate' : 'determinate'}
          color='secondary'
          value={progress}
          className={classes.progress}
        />
      </Grid>
    </Grid>
  );
}
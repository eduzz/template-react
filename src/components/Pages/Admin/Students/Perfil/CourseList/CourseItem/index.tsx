import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/esm/format';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { IStudentCourse } from 'interfaces/models/student';
import React, { PureComponent, SyntheticEvent } from 'react';
import rxjsOperators from 'rxjs-operators';
import studentService from 'services/student';
import { CDN_URL } from 'settings';

const nutrorLogo = require('assets/svg/nutror-logo.svg');

interface IProps {
  classes?: any;
  course: IStudentCourse;
  match?: any;
}

interface IState {
  progress: number;
}

@WithRouter()
@WithStyles(theme => ({
  root: {
    border: '1px solid',
    borderRadius: 2,
    color: '#8C9198',
    borderColor: theme.variables.contentBorderColor,
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 4,
    '&:before': {
      content: '""',
      width: 4,
      height: 'calc(100% + 2px)',
      backgroundColor: theme.variables.colors.disabled,
      position: 'absolute',
      left: -1,
      borderRadius: '2px 0 0 2px',
    },
  },
  active: {
    '&:before': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 2,
  },
  progress: {
    width: 180,
  },
}))
export default class CourseItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      progress: 0,
    };
  }

  componentDidMount() {
    const { id, type } = this.props.course;

    studentService.getStudentCourseProgress(this.props.match.params.id, id, type).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(progress => {
      this.setState({
        progress,
      });
    });
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = nutrorLogo;
  }

  render() {
    const { classes, course } = this.props;
    const { progress } = this.state;

    return (
      <ListItem className={`${classes.root}`}>
        <Grid container wrap='nowrap' alignItems='center' spacing={16}>
          <Grid item xs='auto'>
            <Grid container>
              <img
                className={classes.avatar}
                alt=''
                src={course.avatar ? CDN_URL + course.avatar : null}
                onError={this.handleImageError}
              />
            </Grid>
          </Grid>
          <Grid item xs={true}>
            <Grid container alignItems='center' spacing={16}>
              <Grid item sm={4}>
                <Typography variant='subtitle2' color='inherit' noWrap>{course.title}</Typography>
              </Grid>
              <Grid item sm={true}>
                <Typography variant='subtitle2' color='inherit' noWrap>{format(new Date(course.created_at), 'dd/MM/YYYY')}</Typography>
              </Grid>
              <Grid item xs='auto'>
                <Grid container alignItems='center' spacing={8}>
                  <Grid item>
                    <Typography variant='subtitle2' color='inherit'>{progress}%</Typography>
                  </Grid>
                  <Grid item>
                    <LinearProgress variant='determinate' color='secondary' value={progress} className={classes.progress} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}
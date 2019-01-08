import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toast from 'components/Shared/Toast';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { IStudent } from 'interfaces/models/student';
import React, { PureComponent, SyntheticEvent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';
import { CDN_URL } from 'settings';

interface IProps {
  classes?: any;
  history?: any;
  match?: any;
}

interface IState {
  student: IStudent;
}

@WithRouter()
@WithStyles(theme => ({
  avatar: {
    width: 155,
    height: 155,
    fontSize: 80,
  },
  loadingName: {
    width: 150,
    height: 16,
    backgroundColor: '#bdbdbd',
    marginBottom: theme.spacing.unit * 2,
  },
  loadingEmail: {
    width: 200,
    height: 16,
    backgroundColor: '#bdbdbd',
  },
}))
export default class Info extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      student: {
        name: '',
        email: '',
        avatar: null,
      },
    };
  }

  componentDidMount() {
    studentService.getStudent(this.props.match.params.id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(student => {
      this.setState({
        student,
      });
    }, error => {
      this.props.history.push('/alunos');
      Toast.error(error);
    });
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = null;
  }

  render() {
    const { classes } = this.props;
    const { student } = this.state;

    if (!student.id)
      return (
        <Grid container alignItems='center' spacing={24}>
          <Grid item>
            <Avatar className={classes.avatar}>{' '}</Avatar>
          </Grid>
          <Grid item>
            <div className={classes.loadingName} />
            <div className={classes.loadingEmail} />
          </Grid>
        </Grid>
      );

    return (
      <Grid container alignItems='center' spacing={24}>
        <Grid item>
          <Avatar className={classes.avatar} alt={student.name} src={CDN_URL + student.avatar} onError={this.handleImageError}>
            {student.name.substring(0, 1)}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant='h6' gutterBottom>{student.name}</Typography>
          <Typography variant='caption'>{student.email}</Typography>
        </Grid>
      </Grid>
    );
  }
}
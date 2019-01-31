import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Alert from 'components/Shared/Alert';
import Avatar from 'components/Shared/Avatar';
import DropdownMenu from 'components/Shared/DropdownMenu';
import Toast from 'components/Shared/Toast';
import format from 'date-fns/esm/format';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { IStudentCourse } from 'interfaces/models/student';
import DeleteIcon from 'mdi-react/DeleteIcon';
import DoorClosedIcon from 'mdi-react/DoorClosedIcon';
import DoorOpenIcon from 'mdi-react/DoorOpenIcon';
import LockIcon from 'mdi-react/LockIcon';
import LockOpenIcon from 'mdi-react/LockOpenIcon';
import OpenInNewIcon from 'mdi-react/OpenInNewIcon';
import React, { PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

interface IProps {
  classes?: any;
  data: IStudentCourse;
  match?: any;
}

interface IState {
  progress: number;
}

@WithRouter()
@WithStyles(theme => ({
  root: {
    '&:before': {
      content: '""',
      width: 4,
      height: 'calc(100% + 2px)',
      backgroundColor: theme.palette.error.light,
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
}))
export default class CourseItem extends PureComponent<IProps, IState> {
  private actions = [{
    text: this.props.data.release_modules ? 'Bloquear todos os Módulos' : 'Liberar todos os Módulos',
    icon: this.props.data.release_modules ? LockIcon : LockOpenIcon,
    handler: () => this.handleReleaseModules(),
  }, {
    text: this.props.data.status ? 'Bloquear Acesso' : 'Liberar Acesso',
    icon: this.props.data.status ? DoorClosedIcon : DoorOpenIcon,
    handler: () => this.handleDisableCourse(),
  }, {
    text: 'Remover Conteúdo',
    icon: DeleteIcon,
    handler: () => this.handleRemoveAccess(),
  }, {
    text: 'Link de Acesso Direto',
    icon: OpenInNewIcon,
    handler: () => this.handleAccessLink(),
  }];

  constructor(props: IProps) {
    super(props);

    this.state = {
      progress: null,
    };
  }

  componentDidMount() {
    const { id, course } = this.props.data;

    studentService.getStudentCourseProgress(this.props.match.params.id, id, course.id, course.type).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(progress => {
      this.setState({ progress });
    });
  }

  handleReleaseModules = async () => {
    const isOk = await Alert.confirm('Deseja realmente liberar o accesso a todos os modulos desse aluno?');
    if (!isOk) return;

    studentService.releaseModules(this.props.match.params.id, this.props.data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Toast.show('Todos os módulos foram liberados com sucesso'),
      (err: any) => Toast.error(err.data.details)
    );
  }

  handleDisableCourse = async () => {
    const isOk = await Alert.confirm('Deseja realmente bloquear o accesso desse aluno?');
    if (!isOk) return;

    studentService.disableCourse(this.props.match.params.id, this.props.data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Toast.show('Acesso bloqueado com sucesso'),
      (err: any) => Toast.error(err.data.details)
    );
  }

  handleRemoveAccess = async () => {
    const isOk = await Alert.confirm('Deseja realmente remover o accesso desse aluno?');
    if (!isOk) return;

    studentService.removeAccess(this.props.match.params.id, this.props.data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Toast.show('Aluno removido com sucesso'),
      (err: any) => Toast.error(err.data.details)
    );
  }

  handleAccessLink = () => {
    studentService.accessLink(this.props.match.params.id, this.props.data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(url => {
      Alert.show({
        message: url,
        title: 'Link de Acesso Direto',
        ok: 'Copiar'
      });
      Toast.show('URL copiada para a área de transferência com sucesso');
    }, (err: any) => Toast.error(err.data.details));
  }

  render() {
    const { classes, data } = this.props;
    const { progress } = this.state;

    return (
      <ListItem className={`${classes.root} ${data.status ? classes.active : ''}`}>
        <Grid container wrap='nowrap' alignItems='center' spacing={16}>
          <Hidden xsDown>
            <Grid item sm={'auto'}>
              <Avatar className={classes.avatar} src={data.course.avatar} />
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={true}>
            <Typography variant='body1' className={classes.title}>{data.course.title}</Typography>
            <Typography variant='body2'>Matrícula: {format(new Date(data.created_at), 'dd/MM/YYYY')}</Typography>
            <Hidden smUp>
              <CourseProgress progress={progress} classes={classes} />
            </Hidden>
          </Grid>
          <Hidden xsDown>
            <Grid item xs='auto'>
              <CourseProgress progress={progress} classes={classes} />
            </Grid>
          </Hidden>
          <Grid item xs={false}>
            <DropdownMenu options={this.actions} />
          </Grid>
        </Grid>
      </ListItem>
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
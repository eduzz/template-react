import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Alert from 'components/Shared/Alert';
import Avatar from 'components/Shared/Avatar';
import DropdownMenu from 'components/Shared/DropdownMenu';
import OptionItem from 'components/Shared/DropdownMenu/OptionItem';
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
import React, { Fragment, PureComponent } from 'react';
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
  constructor(props: IProps) {
    super(props);

    this.state = {
      progress: null,
    };
  }

  get id(): number {
    return this.props.match.params.id;
  }

  componentDidMount() {
    const { id, course } = this.props.data;

    studentService.getStudentCourseProgress(this.id, id, course.id, course.type).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(progress => {
      this.setState({ progress });
    });
  }

  handleReleaseModules = async () => {
    const { data } = this.props;

    const isOk = await Alert.confirm(`Deseja realmente ${data.release_modules ? 'bloquear' : 'liberar'} o acesso a todos os modulos desse aluno?`);
    if (!isOk) return;

    studentService.releaseModules(this.id, this.props.data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Toast.show(`Todos os módulos foram ${data.release_modules ? 'bloqueados' : 'liberados'} com sucesso`),
      (err: any) => Toast.error(err)
    );
  }

  handleDisableCourse = async () => {
    const isOk = await Alert.confirm('Deseja realmente bloquear o acesso desse aluno?');
    if (!isOk) return;

    studentService.disableCourse(this.id, this.props.data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Toast.show('Acesso bloqueado com sucesso'),
      (err: any) => Toast.error(err)
    );
  }

  handleRemoveAccess = async () => {
    const isOk = await Alert.confirm('Deseja realmente remover o acesso desse aluno?');
    if (!isOk) return;

    studentService.removeAccess(this.id, this.props.data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Toast.show('Aluno removido com sucesso'),
      (err: any) => Toast.error(err)
    );
  }

  handleAccessLink = () => {
    const { data } = this.props;

    studentService.accessLink(this.id, data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(url => {
      Alert.show({
        message: (
          <span>
            O link abaixo é válido pelo período de 24 horas.
            <br /><br />
            <span style={{ wordBreak: 'break-all' }}>{url}</span>
          </span>
        ),
        title: 'Link de Acesso Direto',
        copy: url
      });
    }, (err: any) => Toast.error(err));
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
            <DropdownMenu >
              {data.permission.update &&
                <Fragment>
                  <OptionItem
                    text={data.release_modules ? 'Bloquear todos os Módulos' : 'Liberar todos os Módulos'}
                    icon={data.release_modules ? LockIcon : LockOpenIcon}
                    handler={this.handleReleaseModules}
                  />
                  <OptionItem
                    text={data.status ? 'Bloquear Acesso' : 'Liberar Acesso'}
                    icon={data.status ? DoorClosedIcon : DoorOpenIcon}
                    handler={this.handleDisableCourse}
                  />
                </Fragment>
              }
              {data.permission.delete &&
                <OptionItem
                  text={'Remover Conteúdo'}
                  icon={DeleteIcon}
                  handler={this.handleRemoveAccess}
                />
              }
              <OptionItem
                text={'Link de Acesso Direto'}
                icon={OpenInNewIcon}
                handler={this.handleAccessLink}
              />
            </DropdownMenu>
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
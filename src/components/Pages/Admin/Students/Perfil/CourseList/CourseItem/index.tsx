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
import AccountRemoveIcon from 'mdi-react/AccountRemoveIcon';
import BlockHelperIcon from 'mdi-react/BlockHelperIcon';
import CheckBoxMultipleOutlineIcon from 'mdi-react/CheckBoxMultipleOutlineIcon';
import OpenInNewIcon from 'mdi-react/OpenInNewIcon';
import React, { PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

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
    text: 'Liberação de Módulos',
    icon: CheckBoxMultipleOutlineIcon,
    handler: () => this.handleReleaseModules(),
  }, {
    text: 'Bloquear Acesso',
    icon: BlockHelperIcon,
    handler: () => this.handleDisableCourse(),
  }, {
    text: 'Remover Acesso',
    icon: AccountRemoveIcon,
    handler: () => this.handleRemoveAccess(),
  }, {
    text: 'Link de Acesso Direto',
    icon: OpenInNewIcon,
    handler: () => this.handleAccessLink(),
  }];

  constructor(props: IProps) {
    super(props);

    this.state = {
      progress: 0,
    };
  }

  componentDidMount() {
    const { id, type } = this.props.course;

    studentService.getStudentCourseProgress(this.props.match.params.id, id, type).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(progress => {
      this.setState({ progress });
    });
  }

  handleReleaseModules = async () => {
    const isOk = await Alert.confirm('Deseja realmente liberar o accesso a todos os modulos desse aluno?');
    if (!isOk) return;

    studentService.releaseModules(this.props.match.params.id, this.props.course.id).pipe(
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

    studentService.disableCourse(this.props.match.params.id, this.props.course.id).pipe(
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

    studentService.removeAccess(this.props.match.params.id, this.props.course.id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Toast.show('Aluno removido com sucesso'),
      (err: any) => Toast.error(err.data.details)
    );
  }

  handleAccessLink = () => {
    studentService.accessLink(this.props.match.params.id, this.props.course.id).pipe(
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
    const { classes, course } = this.props;
    const { progress } = this.state;

    return (
      <ListItem className={classes.root}>
        <Grid container wrap='nowrap' alignItems='center' spacing={16}>
          <Hidden xsDown>
            <Grid item sm={'auto'}>
              <Avatar className={classes.avatar} src={course.avatar} />
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={true}>
            <Typography variant='body1'>{course.title}</Typography>
            <Typography variant='body2'>Matrícula: {format(new Date(course.created_at), 'dd/MM/YYYY')}</Typography>
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
        <Typography variant='subtitle2' color='inherit'>{progress}%</Typography>
      </Grid>
      <Grid item>
        <LinearProgress variant='determinate' color='secondary' value={progress} className={classes.progress} />
      </Grid>
    </Grid>
  );
}
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from 'components/Shared/Alert';
import DropdownMenu from 'components/Shared/DropdownMenu';
import OptionItem from 'components/Shared/DropdownMenu/OptionItem';
import Toast from 'components/Shared/Toast';
import format from 'date-fns/esm/format';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import { IStudentCourse, IStudentCourseAcquisition } from 'interfaces/models/student';
import DeleteIcon from 'mdi-react/DeleteIcon';
import DoorClosedIcon from 'mdi-react/DoorClosedIcon';
import DoorOpenIcon from 'mdi-react/DoorOpenIcon';
import LockIcon from 'mdi-react/LockIcon';
import LockOpenIcon from 'mdi-react/LockOpenIcon';
import OpenInNewIcon from 'mdi-react/OpenInNewIcon';
import React, { Fragment, PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

interface IProps extends IStyledProps {
  studentId: number;
  course: IStudentCourse;
  data: IStudentCourseAcquisition;
}

@WithStyles(theme => ({
  root: {
    position: 'relative',
    '&:before': {
      content: '""',
      width: 4,
      height: 'calc(100% + 2px)',
      backgroundColor: theme.palette.error.light,
      position: 'absolute',
      left: -24,
      borderRadius: '2px 0 0 2px',
    },
  },
  active: {
    '&:before': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}))
export default class AcquisitionItem extends PureComponent<IProps> {
  handleReleaseModules = async () => {
    const { data, studentId, course } = this.props;

    const isOk = await Alert.confirm(`Deseja realmente ${data.release_modules ? 'bloquear' : 'liberar'} o acesso a todos os modulos deste aluno?`);
    if (!isOk) return;

    studentService.releaseModules(studentId, course.id, data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Toast.show(`Todos os módulos foram ${data.release_modules ? 'bloqueados' : 'liberados'} com sucesso`),
      (err: any) => Toast.error(err)
    );
  }

  handleDisableCourse = async () => {
    const { data, studentId, course } = this.props;

    const isOk = await Alert.confirm(`Deseja realmente ${data.status ? 'bloquear' : 'liberar'} o acesso deste aluno?`);
    if (!isOk) return;

    studentService.disableCourse(studentId, course.id, data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Toast.show(`Acesso ${data.status ? 'bloqueado' : 'liberado'} com sucesso`),
      (err: any) => Toast.error(err)
    );
  }

  handleRemoveAccess = async () => {
    const { data, studentId, course } = this.props;

    const isOk = await Alert.confirm('Deseja realmente remover o acesso deste aluno?');
    if (!isOk) return;

    studentService.removeAccess(studentId, course.id, data.id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Toast.show('Aluno removido com sucesso'),
      (err: any) => Toast.error(err)
    );
  }

  handleAccessLink = () => {
    const { data, studentId, course } = this.props;

    studentService.accessLink(studentId, course.id, data.id).pipe(
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
    const { data, course, classes } = this.props;

    return (
      <div className={`${classes.root} ${data.status ? classes.active : ''}`}>
        <Grid container wrap='nowrap' alignItems='center' spacing={16}>
          <Grid item xs={12} sm={true}>
            <Typography variant='body2'>Matrícula: {format(new Date(data.created_at), 'dd/MM/YYYY')}</Typography>
          </Grid>
          <Grid item xs={false}>
            <DropdownMenu >
              {course.permission.update &&
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
              {course.permission.delete &&
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
      </div>
    );
  }
}
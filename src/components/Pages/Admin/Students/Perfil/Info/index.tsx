import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Alert from 'components/Shared/Alert';
import DropdownMenu from 'components/Shared/DropdownMenu';
import ErrorMessage from 'components/Shared/ErrorMessage';
import Toast from 'components/Shared/Toast';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { IStudent } from 'interfaces/models/student';
import AtIcon from 'mdi-react/AtIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import LockResetIcon from 'mdi-react/LockResetIcon';
import SendIcon from 'mdi-react/SendIcon';
import SettingsOutlineIcon from 'mdi-react/SettingsOutlineIcon';
import React, { Fragment, PureComponent, SyntheticEvent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';
import { CDN_URL } from 'settings';

import ChangeEmailDialog from './ChangeEmailDialog';
import ChangePasswordDialog from './ChangePasswordDialog';

interface IProps {
  match?: any;
  classes?: any;
  history?: any;
}

interface IState {
  student?: IStudent;
  changeEmailOpened: boolean;
  changePasswordOpened: boolean;
  error?: any;
}

@WithRouter()
@WithStyles(theme => ({
  avatar: {
    width: 80,
    height: 80,
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
  icon: {
    color: '#596375',
  },
  settings: {
    alignSelf: 'flex-start',
  }
}))
export default class Info extends PureComponent<IProps, IState> {
  private actions = [{
    text: 'Redefinir E-mail',
    icon: AtIcon,
    handler: () => this.handleOpenChangeEmail(),
  }, {
    text: 'Redefinir Senha',
    icon: LockResetIcon,
    handler: () => this.handleOpenChangePassword(),
  }, {
    text: 'Enviar link de redefinição de Senha',
    icon: SendIcon,
    handler: () => this.handleRecoveryPassword(),
  }, {
    text: 'Excluir Aluno',
    icon: DeleteIcon,
    handler: () => console.log(true),
  }];

  constructor(props: IProps) {
    super(props);

    this.state = {
      changeEmailOpened: false,
      changePasswordOpened: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ error: null });

    studentService.getStudent(this.props.match.params.id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(result => {
      this.setState({
        student: result.updating ? null : result.data
      });
    }, error => this.setState({ error }));
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = null;
  }

  handleOpenChangeEmail = () => { this.setState({ changeEmailOpened: true }); };
  handleCloseChangeEmail = async () => { this.setState({ changeEmailOpened: false }); };

  handleOpenChangePassword = () => { this.setState({ changePasswordOpened: true }); };
  handleCloseChangePassword = async () => { this.setState({ changePasswordOpened: false }); };

  handleRecoveryPassword = () => {
    studentService.sendRecoveryPassword(this.props.match.params.id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(
      () => Toast.show('Link de recuperação de senha enviado com sucesso'),
      err => Toast.error(err.data.details)
    );
  }

  handleRemoveStudent = () => {
    studentService.removeStudent(this.props.match.params.id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(
      () => Alert.show('Aluno removido com sucesso'),
      err => Toast.error(err.data.details),
    );
  }

  render() {
    const { classes } = this.props;
    const { student, changeEmailOpened, changePasswordOpened, error } = this.state;

    if (!!error) {
      return (
        <CardContent>
          <ErrorMessage error={error} tryAgain={this.loadData} />
        </CardContent>
      );
    }

    if (!student)
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
      <Fragment>
        <ChangeEmailDialog
          studentID={this.props.match.params.id}
          opened={changeEmailOpened}
          onCancel={this.handleCloseChangeEmail}
        />
        <ChangePasswordDialog
          studentID={this.props.match.params.id}
          opened={changePasswordOpened}
          onCancel={this.handleCloseChangePassword}
        />
        <Grid container alignItems='center' spacing={24}>
          <Grid item>
            <Avatar className={classes.avatar} alt={student.name} src={CDN_URL + student.avatar} onError={this.handleImageError}>
              {student.name.substring(0, 1)}
            </Avatar>
          </Grid>
          <Grid item xs={true}>
            <Typography variant='h6'>{student.name}</Typography>
            <Typography variant='caption'>{student.email}</Typography>
          </Grid>
          <Grid item className={classes.settings}>
            <DropdownMenu options={this.actions}>
              <IconButton className={classes.icon}>
                <SettingsOutlineIcon />
              </IconButton>
            </DropdownMenu>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
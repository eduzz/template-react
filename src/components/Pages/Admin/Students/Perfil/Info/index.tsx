import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DropdownMenu from 'components/Shared/DropdownMenu';
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

interface IProps {
  match?: any;
  classes?: any;
  history?: any;
}

interface IState {
  student: IStudent;
  changeEmailOpened: boolean;
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
  constructor(props: IProps) {
    super(props);

    this.state = {
      student: {
        name: '',
        email: '',
        avatar: null,
      },
      changeEmailOpened: false,
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

  handleOpenChangeEmail = () => {
    this.setState({ changeEmailOpened: true });
  }

  handleCloseChangeEmail = async (placeholders?: { [key: string]: string }) => {
    this.setState({ changeEmailOpened: false });
  }

  private actions = [{
    text: 'Redefinir E-mail',
    icon: AtIcon,
    handler: this.handleOpenChangeEmail,
  }, {
    text: 'Redefinir Senha',
    icon: LockResetIcon,
    handler: () => console.log(true),
  }, {
    text: 'Enviar link de redefinição de Senha',
    icon: SendIcon,
    handler: () => console.log(true),
  }, {
    text: 'Excluir Aluno',
    icon: DeleteIcon,
    handler: () => console.log(true),
  }];

  render() {
    const { classes } = this.props;
    const { student, changeEmailOpened } = this.state;

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
      <Fragment>
        <ChangeEmailDialog
          studentID={this.props.match.params.id}
          opened={changeEmailOpened}
          onCancel={this.handleCloseChangeEmail}
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
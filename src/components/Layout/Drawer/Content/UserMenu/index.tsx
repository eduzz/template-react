import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DropdownMenu from 'components/Shared/DropdownMenu';
import OptionItem from 'components/Shared/DropdownMenu/OptionItem';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import IUserToken from 'interfaces/tokens/userToken';
import ExitToAppIcon from 'mdi-react/ExitToAppIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import React, { PureComponent } from 'react';
import * as RxOp from 'rxjs-operators';
import authService from 'services/auth';

interface IState {
  user: IUserToken;
}

interface IProps {
  closeDrawer: () => void;
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    textAlign: 'left',
    color: theme.palette.primary.contrastText,
    width: '100%'
  },
  text: {
    padding: '8px 15px 0 15px',
    lineHeight: 'normal'
  },
  textSmall: {
    display: 'block',
    marginBottom: '2px'
  }
}))
export default class UserMenu extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    authService
      .getUser()
      .pipe(
        RxOp.logError(),
        RxOp.bindComponent(this)
      )
      .subscribe(
        user => {
          this.setState({ user });
        },
        err => Toast.error(err)
      );
  }

  handleChangePassword = () => {
    authService.openChangePassword();
  };

  handleLogout = () => {
    this.props.closeDrawer();

    authService
      .logout()
      .pipe(
        RxOp.logError(),
        RxOp.bindComponent(this)
      )
      .subscribe(() => {}, err => Toast.error(err));
  };

  render() {
    const { classes } = this.props;
    const { user } = this.state;

    if (!user) {
      return null;
    }

    return (
      <Grid container className={classes.root} wrap='nowrap'>
        <Grid item xs={true}>
          <Typography variant='body1' color='inherit' className={classes.text}>
            <small className={classes.textSmall}>Bem vindo</small>
            {user.firstName}
          </Typography>
        </Grid>
        <Grid item>
          <DropdownMenu>
            <OptionItem text='Trocar senha' icon={KeyVariantIcon} handler={this.handleChangePassword} />
            <OptionItem text='Sair' icon={ExitToAppIcon} handler={this.handleLogout} />
          </DropdownMenu>
        </Grid>
      </Grid>
    );
  }
}

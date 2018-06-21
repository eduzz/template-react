import { Grid, Typography } from '@material-ui/core';
import { DrawerContext, IDrawerContext } from 'components/AppWrapper';
import DropdownMenu from 'components/DropdownMenu';
import { WithStyles } from 'decorators/withStyles';
import { IUserToken } from 'interfaces/userToken';
import ExitToAppIcon from 'mdi-react/ExitToAppIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

interface IState {
  user?: IUserToken;
}

interface IProps {
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
export default class AppDrawerUser extends PureComponent<IProps, IState>  {
  drawer: IDrawerContext;

  constructor(props: IProps) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    authService.getUser().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(user => this.setState({ user }));
  }

  handleChangePassword() {
    authService.openChangePassword();
  }

  handleLogout() {
    this.drawer.close();

    authService.logout().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe();
  }

  render() {
    const { user } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <DrawerContext.Consumer>
          {drawer => (this.drawer = drawer) && null}
        </DrawerContext.Consumer>

        <Grid container className={classes.root} wrap='nowrap'>
          <Grid item xs={true} >
            <Typography variant='body2' color='inherit' className={classes.text}>
              <small className={classes.textSmall}>Bem vindo</small>
              {user && user.name}
            </Typography>
          </Grid>
          <Grid item>
            <DropdownMenu options={[{
              text: 'Trocar senha',
              icon: KeyVariantIcon,
              handler: this.handleChangePassword.bind(this)
            }, {
              text: 'Sair',
              icon: ExitToAppIcon,
              handler: this.handleLogout.bind(this)
            }]} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
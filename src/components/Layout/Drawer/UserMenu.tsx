import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DropdownMenu from 'components/Shared/DropdownMenu';
import { WithStyles } from 'decorators/withStyles';
import { DeepReadonly } from 'helpers/immutable';
import redirectV2 from 'helpers/redirectV2';
import { IUserToken } from 'interfaces/userToken';
import AccountIcon from 'mdi-react/AccountIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

import { DrawerContext, IDrawerContext } from '.';

interface IProps {
  user: DeepReadonly<IUserToken>;
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
  },
  gridUser: {
    maxWidth: 'calc(100% - 50px)'
  },
  userName: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    margin: '0'
  }
}))
export default class AppDrawerUser extends PureComponent<IProps> {
  drawer: IDrawerContext;
  actions = [{
    text: 'Meus Dados',
    icon: AccountIcon,
    handler: () => redirectV2('/user/dados')
  }];

  constructor(props: IProps) {
    super(props);
    this.state = { user: null };
  }

  handleChangePassword = () => {
    authService.openChangePassword();
  }

  handleLogout = () => {
    this.drawer.close();

    authService.logout().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe();
  }

  render() {
    const { classes, user } = this.props;

    if (!user) {
      return null;
    }

    return (
      <Fragment>
        <DrawerContext.Consumer>
          {drawer => (this.drawer = drawer) && null}
        </DrawerContext.Consumer>

        <Grid container className={classes.root} wrap='nowrap'>
          <Grid item xs={true} className={classes.gridUser}>
            <Typography variant='body2' color='inherit' className={classes.text}>
              <small className={classes.textSmall}>Bem vindo</small>
              <p className={classes.userName}>{user.name}</p>
            </Typography>
          </Grid>
          <Grid item>
            <DropdownMenu options={this.actions} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
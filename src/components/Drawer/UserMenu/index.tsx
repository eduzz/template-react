import { Grid, Typography } from '@material-ui/core';
import DropdownMenu from 'components/DropdownMenu';
import { WithStyles } from 'decorators/withStyles';
import { IUserToken } from 'interfaces/userToken';
import { ExitToAppIcon, KeyVariantIcon } from 'mdi-react';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { logout } from 'store/actionsCreators';

interface IProps {
  closeDrawer: Function;
  classes?: any;
}

interface IPropsFromConnect {
  user?: IUserToken;
  logout?: typeof logout;
}

@WithStyles(theme => ({
  root: {
    textAlign: 'left',
    marginTop: '20px',
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
class AppDrawerUser extends PureComponent<IProps & IPropsFromConnect> {
  logoff() {
    this.props.closeDrawer();
    this.props.logout();
  }

  render() {
    const { user, classes } = this.props;

    return (
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
            handler: () => { }
          }, {
            text: 'Sair',
            icon: ExitToAppIcon,
            handler: this.logoff.bind(this)
          }]} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: IProps) => {
  return {
    ...ownProps,
    user: state.auth.user
  };
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  logout
})(AppDrawerUser);
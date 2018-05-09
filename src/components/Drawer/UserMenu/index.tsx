import DropdownMenu from 'components/DropdownMenu';
import { Grid, Typography } from 'material-ui';
import { ExitToAppIcon, KeyVariantIcon } from 'mdi-react';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { logout } from 'store/actionsCreators';

const style = require('./index.css');

interface IProps {
  closeDrawer: Function;
}

interface IPropsFromConnect {
  logout?: typeof logout;
}

class AppDrawerUser extends PureComponent<IProps & IPropsFromConnect> {
  logoff() {
    this.props.closeDrawer();
    this.props.logout();
  }

  render() {
    return (
      <Grid container className={style.component} wrap='nowrap'>
        <Grid item xs={true} >
          <Typography variant='body2' color='inherit' className='text'>
            Daniel
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
  return {};
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  logout
})(AppDrawerUser);
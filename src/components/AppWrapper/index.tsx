import { Drawer, Hidden } from '@material-ui/core';
import { variables } from 'assets/theme';
import AppDrawer from 'components/Drawer';
import { WithStyles } from 'decorators/withStyles';
import { IAppRoute } from 'interfaces/route';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { closeDrawer } from 'store/actionsCreators';

interface IProps {
  routes: IAppRoute[];
  classes?: any;
}

interface IPropsFromConnect {
  drawerOpened: boolean;
  closeDrawer?: typeof closeDrawer;
}

@WithStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  drawer: {
    width: variables.drawerWidth,
    borderRight: 'none !important',
    boxShadow: `${variables.boxShadow} !important`,
    [theme.breakpoints.up('md')]: {
      width: variables.drawerWidth,
      position: 'relative',
      height: '100vh'
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    padding: variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      padding: variables.contentPaddingUpSm,
    }
  }
}))
class AppWrapper extends PureComponent<IProps & IPropsFromConnect> {
  render() {
    const { } = this.state;
    const { children, routes, drawerOpened, closeDrawer, classes } = this.props;
    const items = <AppDrawer routes={routes} closeDrawer={() => closeDrawer()} />;

    return (
      <div className={classes.root}>
        <Hidden mdUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor='left'
            open={drawerOpened}
            classes={{ paper: classes.drawer }}
            onClose={() => closeDrawer()}
            ModalProps={{ keepMounted: true }}>
            {items}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            variant='permanent'
            open
            classes={{ paper: classes.drawer }}>
            {items}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          {children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: IProps) => {
  return {
    ...ownProps,
    drawerOpened: state.drawer.isOpened
  };
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  closeDrawer
})(AppWrapper);
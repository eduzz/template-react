import AppDrawer from 'components/Drawer';
import { IAppRoute } from 'interfaces/route';
import { Drawer, Hidden } from 'material-ui';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { closeDrawer } from 'store/actionsCreators';

const styles = require('./index.css');

interface IProps {
  routes: IAppRoute[];
}

interface IPropsFromConnect {
  drawerOpened: boolean;
  closeDrawer?: typeof closeDrawer;
}

class AppWrapper extends PureComponent<IProps & IPropsFromConnect> {
  render() {
    const { } = this.state;
    const { children, routes, drawerOpened, closeDrawer } = this.props;
    const items = <AppDrawer routes={routes} closeDrawer={() => closeDrawer()} />;

    return (
      <div className={styles.component}>
        <Hidden mdUp>
          <Drawer
            variant='temporary'
            anchor='left'
            open={drawerOpened}
            classes={{ paper: styles.drawer }}
            onClose={() => closeDrawer()}
            ModalProps={{ keepMounted: true }}>
            {items}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            variant='permanent'
            open
            classes={{ paper: styles.drawer }}>
            {items}
          </Drawer>
        </Hidden>
        <main className='content'>
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
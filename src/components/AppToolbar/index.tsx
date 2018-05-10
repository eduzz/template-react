import { whiteTheme } from 'assets/theme';
import { AppBar, IconButton, MuiThemeProvider, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'mdi-react/MenuIcon';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { openDrawer } from 'store/actionsCreators';

const styles = require('./index.css');

interface IProps {
  title?: string;
}

interface IPropsFromConnect {
  openDrawer?: typeof openDrawer;
}

class AppToolbar extends PureComponent<IProps & IPropsFromConnect> {
  render() {
    const { openDrawer, children, title } = this.props;

    return (
      <div className={styles.component}>
        <MuiThemeProvider theme={whiteTheme}>
          <AppBar className='app-bar' elevation={1}>
            <Toolbar>
              <IconButton color='inherit'
                onClick={() => openDrawer()}
                className='icon-menu'>
                <MenuIcon />
              </IconButton>
              {children}
              {!children &&
                <Typography variant='title' color='inherit' noWrap>
                  {title || 'App'}
                </Typography>
              }
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}) => {
  return ownProps;
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  openDrawer
})(AppToolbar);
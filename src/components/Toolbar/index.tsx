import { AppBar, IconButton, MuiThemeProvider, Toolbar as CoreToolbar, Typography } from '@material-ui/core';
import { variables, whiteTheme } from 'assets/theme';
import { WithStyles } from 'decorators/withStyles';
import MenuIcon from 'mdi-react/MenuIcon';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { openDrawer } from 'store/actionsCreators';

interface IProps {
  title?: string;
  classes?: any;
}

interface IPropsFromConnect {
  openDrawer?: typeof openDrawer;
}

@WithStyles(theme => ({
  root: {
    height: variables.headerHeight,
    marginTop: variables.contentPadding * -1,
    marginBottom: variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      marginTop: variables.contentPaddingUpSm * -1,
      marginBottom: variables.contentPaddingUpSm
    }
  },
  appBar: {
    marginLeft: variables.drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${variables.drawerWidth}px)`
    }
  },
  iconMenu: {
    marginLeft: '-15px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
}))
class Toolbar extends PureComponent<IProps & IPropsFromConnect> {
  render() {
    const { openDrawer, children, title, classes } = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={whiteTheme}>
          <AppBar className={classes.appBar} elevation={1}>
            <CoreToolbar>
              <IconButton color='inherit'
                onClick={() => openDrawer()}
                className={classes.iconMenu}>
                <MenuIcon />
              </IconButton>
              {children}
              {!children &&
                <Typography variant='title' color='inherit' noWrap>
                  {title || 'App'}
                </Typography>
              }
            </CoreToolbar>
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
})(Toolbar);
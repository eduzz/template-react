import { whiteTheme } from 'assets/theme';
import { AppBar, MuiThemeProvider } from 'material-ui';
import React, { PureComponent } from 'react';

const styles = require('./index.css');

interface IProps {
}

export class ToolbarTabs extends PureComponent<IProps> {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.component}>
        <MuiThemeProvider theme={whiteTheme}>
          <AppBar className='app-bar'>
            {children}
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}
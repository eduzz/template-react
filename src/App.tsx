import './assets/global.css';
import './errorHandler';
import 'fieldConfig';

import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { createGenerateClassName } from '@material-ui/core/styles';
import { theme } from 'assets/theme';
import Alert from 'components/Alert';
import Dialogs from 'components/Dialogs';
import AppRouter, { RouterContext } from 'components/Router';
import Snackbar from 'components/Snackbar';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import baseRoutes from 'routes';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

class App extends React.PureComponent {
  router: AppRouter;

  getRouter() {
    return this.router;
  }

  render() {
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Dialogs />

          <Alert.Global />
          <Snackbar.Global />

          <RouterContext.Provider value={this.getRouter.bind(this)}>
            <AppRouter routes={baseRoutes} ref={ref => this.router = ref} />
          </RouterContext.Provider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default App;

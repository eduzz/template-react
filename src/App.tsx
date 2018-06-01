import './assets/global.css';
import './errorHandler';
import 'moment/locale/pt-br';

import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { createGenerateClassName } from '@material-ui/core/styles';
import { theme } from 'assets/theme';
import Alert from 'components/Alert';
import LoginDialog from 'components/LoginDialog';
import AppRouter, { RouterContext } from 'components/Router';
import Snackbar from 'components/Snackbar';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import baseRoutes from 'routes';
import { configureStore, IAppStore } from 'store';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

class App extends React.PureComponent {
  store: IAppStore;
  router: AppRouter;

  constructor(props: any) {
    super(props);
    this.store = configureStore();
  }

  getRouter() {
    return this.router;
  }

  render() {
    return (
      <Provider store={this.store}>
        <JssProvider generateClassName={generateClassName}>
          <MuiPickersUtilsProvider utils={MomentUtils} locale='pt-br'>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <LoginDialog />
              <Alert.Global />
              <Snackbar.Global />

              <RouterContext.Provider value={this.getRouter.bind(this)}>
                <AppRouter routes={baseRoutes} ref={ref => this.router = ref} />
              </RouterContext.Provider>
            </MuiThemeProvider>
          </MuiPickersUtilsProvider>
        </JssProvider>
      </Provider>
    );
  }
}

export default App;

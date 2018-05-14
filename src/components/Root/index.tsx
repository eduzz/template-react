import { theme } from 'assets/theme';
import Alert from 'components/Alert';
import LoginDialog from 'components/LoginDialog';
import AppRouter from 'components/Router';
import Snackbar from 'components/Snackbar';
import { CssBaseline, MuiThemeProvider } from 'material-ui';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import React from 'react';
import { Provider } from 'react-redux';
import baseRoutes from 'routes';
import { configureStore, IAppStore } from 'store';

export const RouterContext = React.createContext<() => AppRouter>(null);

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
        <MuiPickersUtilsProvider utils={MomentUtils}>
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
      </Provider>
    );
  }
}

export default App;

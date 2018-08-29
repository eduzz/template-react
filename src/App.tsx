import './assets/global.css';
import './version';
import 'fieldConfig';

import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { createGenerateClassName } from '@material-ui/core/styles';
import { theme } from 'assets/theme';
import Dialogs from 'components/Dialogs';
import AppRouter, { RouterContext } from 'components/Router';
import Alert from 'components/Shared/Alert';
import Loader from 'components/Shared/Loader';
import Snackbar from 'components/Shared/Snackbar';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import baseRoutes from 'routes';
import { setup } from 'rxjs-operators';

// tslint:disable:jsx-no-lambda
const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

class App extends React.PureComponent {
  router: AppRouter;
  loader: Loader;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    setup(this.loader);
  }

  getRouter = () => {
    return this.router;
  }

  render() {
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Dialogs />

          <Loader ref={ref => this.loader = ref} />
          <Alert.Global />
          <Snackbar.Global />

          <RouterContext.Provider value={this.getRouter}>
            <AppRouter routes={baseRoutes} ref={ref => this.router = ref} />
          </RouterContext.Provider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default App;

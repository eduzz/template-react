import './assets/global.css';
import 'fieldConfig';

import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { createGenerateClassName } from '@material-ui/core/styles';
import { theme } from 'assets/theme';
import Dialogs from 'components/Dialogs';
import AppRouter from 'components/Router';
import Alert from 'components/Shared/Alert';
import Loader from 'components/Shared/Loader';
import Snackbar from 'components/Shared/Snackbar';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import baseRoutes from 'routes';
import { setup } from 'rxjs-operators';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

class App extends React.PureComponent {
  loader: Loader;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    setup(this.loader);
  }

  render() {
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Dialogs />

          <Alert.Global />
          <Snackbar.Global />

          <AppRouter routes={baseRoutes} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default App;

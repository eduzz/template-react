import './assets/global.css';
import './version';
import 'fieldConfig';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createGenerateClassName } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { theme } from 'assets/theme';
import Dialogs from 'components/Dialogs';
import AppRouter from 'components/Router';
import Alert from 'components/Shared/Alert';
import Loader from 'components/Shared/Loader';
import Toast from 'components/Shared/Toast';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import baseRoutes from 'routes';
import { setup } from 'rxjs-operators';

// tslint:disable:jsx-no-lambda
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

          <Loader ref={ref => this.loader = ref} />

          <Alert.Global />
          <Toast.Global />

          <AppRouter routes={baseRoutes} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default App;

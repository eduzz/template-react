import './assets/global.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import FormFieldsContext from '@react-form-fields/material-ui/components/Context';
import { theme } from 'assets/theme';
import Dialogs from 'components/Dialogs';
import Pages from 'components/Pages';
import Alert from 'components/Shared/Alert';
import Loader from 'components/Shared/Loader';
import Toast from 'components/Shared/Toast';
import fieldConfig from 'fieldConfig';
import React from 'react';
import { setup } from 'rxjs-operators';

class App extends React.PureComponent {
  loader = React.createRef<Loader>();
  formFieldConfig = fieldConfig;

  componentDidMount() {
    setup(this.loader.current);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <FormFieldsContext config={this.formFieldConfig}>
          <CssBaseline />
          <Dialogs />

          <Loader innerRef={this.loader} />

          <Alert.Global />
          <Toast.Global />

          <Pages />
        </FormFieldsContext>
      </MuiThemeProvider>
    );
  }
}

export default App;

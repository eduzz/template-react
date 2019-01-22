import './assets/global.css';
import './legacyLogin';
import './version';

import CssBaseline from '@material-ui/core/CssBaseline';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import FormFieldsContext from '@react-form-fields/material-ui/components/Context';
import { theme } from 'assets/theme';
import Dialogs from 'components/Dialogs';
import Pages from 'components/Pages';
import Alert from 'components/Shared/Alert';
import Environment from 'components/Shared/Environment/indext';
import Loader from 'components/Shared/Loader';
import Toast from 'components/Shared/Toast';
import fieldConfig from 'fieldConfig';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { setup } from 'rxjs-operators';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

class App extends React.PureComponent {
  loader = React.createRef<Loader>();
  formFieldConfig = fieldConfig;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    setup(this.loader.current);
  }

  render() {
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <FormFieldsContext config={this.formFieldConfig}>
            <CssBaseline />
            <Dialogs />

            <Loader innerRef={this.loader} />

            <Alert.Global />
            <Toast.Global />

            <Environment />

            <Pages />
          </FormFieldsContext>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default App;

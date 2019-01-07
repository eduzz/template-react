import './assets/global.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import commonMasks from '@react-form-fields/core/mask/common/pt-br';
import validationMessage from '@react-form-fields/core/validator/custom-languages/pt-br';
import FormFieldsContext from '@react-form-fields/material-ui/components/Context';
import { theme } from 'assets/theme';
import Dialogs from 'components/Dialogs';
import Pages from 'components/Pages';
import Alert from 'components/Shared/Alert';
import Toast from 'components/Shared/Toast';
import locale from 'date-fns/locale/pt-BR';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

class App extends React.PureComponent {
  formFieldConfig = {
    masks: commonMasks,
    dateLocale: locale,
    validation: validationMessage
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <FormFieldsContext config={this.formFieldConfig}>
            <CssBaseline />
            <Dialogs />

            <Alert.Global />
            <Toast.Global />

            <Pages />
          </FormFieldsContext>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default App;

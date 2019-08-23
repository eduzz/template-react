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
import React, { memo, useEffect } from 'react';
import { setupServices } from 'services';

const App = memo(() => {
  useEffect(() => setupServices(), []);

  return (
    <MuiThemeProvider theme={theme}>
      <FormFieldsContext config={fieldConfig}>
        <CssBaseline />
        <Dialogs />

        <Loader />

        <Alert.Global />
        <Toast.Global />

        <Pages />
      </FormFieldsContext>
    </MuiThemeProvider>
  );
});

export default App;

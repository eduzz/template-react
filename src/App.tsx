import { memo } from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import ThemeProvider from '@eduzz/houston-ui/styles/ThemeProvider/MuiV4Compat';

import { store } from './store';

import theme from '@/assets/theme';
import Alert from '@/components/Globals/Alert';
import Loader from '@/components/Globals/Loader';
import Pages from '@/components/Pages';

const App = memo(() => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MuiThemeProvider theme={theme}>
          <Loader />
          <Alert />

          <Pages />
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>
  );
});

export default App;

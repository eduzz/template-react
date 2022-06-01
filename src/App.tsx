import { memo } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from '@eduzz/houston-ui/ThemeProvider';

import theme from './assets/theme';
import { store } from './store';

import Alert from '@/components/Globals/Alert';
import Loader from '@/components/Globals/Loader';
import Pages from '@/components/Pages';

const App = memo(() => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Loader />
        <Alert />

        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
});

export default App;

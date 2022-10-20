import '@eduzz/houston-ui/ThemeProvider/theme.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import ThemeProvider, { createTheme } from '@eduzz/houston-ui/ThemeProvider';

import Pages from '@/components/Pages';

import { ENV, IS_DEVELOPMENT, SENTRY_KEY } from './settings';
import { store } from './store';

Sentry.init({
  dsn: IS_DEVELOPMENT ? undefined : SENTRY_KEY,
  environment: ENV,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.2
});

const theme = createTheme('eduzz');

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

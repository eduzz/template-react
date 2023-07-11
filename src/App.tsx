import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@eduzz/ui-antd-theme';

import Pages from '@/pages';

import Analytics from './components/Globals/Analytics';
import { logError, logErrorWithToast } from './log';

import './index.css';

export const queryClient = new QueryClient({
  logger: { log: () => null, warn: () => null, error: () => null },
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      onError(error) {
        logError(error);
      }
    },
    mutations: {
      onError(error) {
        logErrorWithToast(error);
      }
    }
  }
});

const App = () => {
  return (
    <ThemeProvider brandColor='orbita'>
      <Analytics />

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

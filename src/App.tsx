import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@eduzz/ui-antd-theme';

import Analytics from '@/configs/Analytics';
import Pages from '@/pages';

import { logErrorWithToast } from './log';

import './index.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
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

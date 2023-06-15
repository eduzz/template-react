import { BrowserRouter } from 'react-router-dom';

import { App as AntdApp } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ThemeProvider from '@eduzz/houston-ui/ThemeProvider';

import Pages from '@/pages';

import theme from './assets/theme';
import Analytics from './components/Globals/Analytics';
import { logError, logErrorWithToast } from './log';

export let message: MessageInstance;
export let notification: NotificationInstance;
export let modal: Omit<ModalStaticFunctions, 'warn'>;

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
    <ThemeProvider theme={theme}>
      <AntdApp>
        <AppBinder />
        <Analytics />

        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Pages />
          </BrowserRouter>
        </QueryClientProvider>
      </AntdApp>
    </ThemeProvider>
  );
};

function AppBinder() {
  const staticFunction = AntdApp.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return <div id='portal-modal' />;
}

export default App;

import React, { lazy } from 'react';

import * as Sentry from '@sentry/react';
import { createRoot } from 'react-dom/client';

import AppLoader from '@eduzz/ui-app-loader';

import AppError from '@/configs/AppError';
import { IS_DEV, SENTRY_DSN, ENV } from '@/envs';

Sentry.init({
  dsn: IS_DEV ? undefined : SENTRY_DSN,
  environment: ENV,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 0.2
});

const App = lazy(() => import('./App'));

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<AppError />}>
      <AppLoader>
        <App />
      </AppLoader>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);

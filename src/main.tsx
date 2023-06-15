import React from 'react';

import * as Sentry from '@sentry/react';
import { createRoot } from 'react-dom/client';

import AppError from '@/components/Globals/AppError';
import { IS_DEV, SENTRY_DSN, ENV } from '@/envs';

import AppLoader from './components/Globals/AppLoader';

Sentry.init({
  dsn: IS_DEV ? undefined : SENTRY_DSN,
  environment: ENV,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 0.2
});

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<AppError />}>
      <AppLoader />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);

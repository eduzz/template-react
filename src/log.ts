import { hotjar } from 'react-hotjar';

import * as Sentry from '@sentry/react';

import { notification } from '@eduzz/ui-antd-theme';

import { IS_DEV } from '@/envs';

import errorFormatter from './formatters/error';
import useAuthStore from './stores/auth';

export class AppLoggerError extends Error {
  public readonly extraData: any;

  constructor(message: string, extraData: any) {
    super(message);
    this.extraData = extraData;
  }
}

export function event(eventName: string, metadata?: Record<string, string | number>) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, metadata });
  if (hotjar.initialized()) hotjar.event(eventName);
}

export function logErrorWithToast(error: any, tags: Record<string, string> = {}) {
  logError(error, { ...tags, toast: 'true' });
  notification.error({ message: 'Erro', description: errorFormatter(error) });
}

export function logError(err: any, tags: Record<string, string> = {}) {
  if (!err) return;

  if (typeof err === 'string') {
    err = new Error(err);
  }

  if (IS_DEV) {
    console.log(err);
    return;
  }

  if (err.ignoreLog) {
    return;
  }

  event('error', { error: err });

  Sentry.withScope(() => {
    const user = useAuthStore().currentUser();

    if (user) {
      Sentry.setUser({ id: user.id.toString(), email: user.email, username: user.email, extra: { ...user } });
    }

    Sentry.setTags({ ...tags });
    Sentry.setExtras({ extra: err.extraData || {} });
    Sentry.captureException(err);
  });
}

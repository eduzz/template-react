import Raven from 'raven-js';
import { ENV, SENTRY_KEY } from 'settings';

let ravenSetup = false;

if (SENTRY_KEY) {
  Raven
    .config(SENTRY_KEY, {
      environment: ENV,
      tags: { environment: ENV }
    })
    .install();

  Raven.setShouldSendCallback(() => {
    let err: any = Raven.lastException();
    // if (!err || err.ignoreLog || err.reported) return false;

    err.reported = true;
    return true;
  });

  ravenSetup = true;
}

export function addBreadcrumb(message: string, category: string = 'manual', data: any = {}): void {
  data = data || {};
  delete data.type;

  ravenSetup && Raven.captureBreadcrumb({ message, category, data });
}

export function logError(err: any, force: boolean = false): void {
  ravenSetup && Raven.captureException(err, { extra: err.extraData });
}
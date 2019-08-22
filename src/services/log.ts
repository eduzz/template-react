import Raven from 'raven-js';

import IUserToken from '../interfaces/tokens/userToken';
import { ENV, SENTRY_KEY } from '../settings';

export class LogService {
  private bugsnag: any;

  constructor(sentryKey: string) {
    Raven.config(sentryKey, {
      environment: ENV,
      tags: { environment: ENV }
    }).install();

    Raven.setShouldSendCallback(() => {
      let err: any = Raven.lastException();
      if (!err || err.ignoreLog || err.reported) return false;

      err.reported = true;
      return true;
    });
  }

  public setUser(user: IUserToken): void {
    if (!user) {
      this.bugsnag.clearUser();
      return;
    }

    this.bugsnag.setUser(user.id.toString(), user.fullName);
  }

  public breadcrumb(message: string, category: string = 'manual', data: any = {}): void {
    data = data || {};
    delete data.type;

    Raven.captureBreadcrumb({ message, category, data });
  }

  public handleError(err: any): void {
    if (!err) return;

    if (typeof err === 'string') {
      err = new Error(err);
    }

    Raven.captureException(err, { extra: err.extraData });
  }
}

const logService = new LogService(SENTRY_KEY);
export default logService;

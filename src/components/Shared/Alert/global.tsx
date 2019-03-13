import React, { PureComponent } from 'react';

import Alert, { IAlertShowParams } from '.';

interface IState {
  opened: boolean;
  message?: React.ReactNode;
  title?: string;
  confirmation?: boolean;
}

let lastPromise = Promise.resolve(false);
let globalAlert: (params: IAlertShowParams) => Promise<boolean>;

export class AlertGlobalProvider extends PureComponent<{}, IState> {
  promiseResolve: (result: boolean) => void;

  constructor(props: {}) {
    super(props);
    this.state = { opened: false };
  }

  componentDidMount() {
    if (globalAlert) throw new Error('Only one Alert.Global can be initialized');
    globalAlert = this.show;
  }

  static async  show(params: IAlertShowParams): Promise<boolean> {
    if (!globalAlert) throw new Error('Please, initialize an Alert.Global before');

    //prevent an alert to overhide another
    return lastPromise = lastPromise.then(async () => {
      await new Promise(resolve => setTimeout(() => resolve(), 300));
      return globalAlert(params);
    });
  }

  show = (params: IAlertShowParams): Promise<boolean> => {
    const result = new Promise<boolean>(resolve => {
      this.promiseResolve = resolve;
      this.setState({ opened: true, confirmation: false, title: null, ...params });
    });

    result.then(() => this.setState({ opened: false }));
    return result;
  }

  onClose = (ok: boolean) => {
    this.promiseResolve && this.promiseResolve(ok);
  }

  render() {
    const { opened, message, title, confirmation } = this.state;

    return (
      <Alert
        opened={opened}
        message={message}
        title={title}
        confirmation={confirmation}
        onClose={this.onClose}
      />
    );
  }
}
import React, { PureComponent } from 'react';

import Snackbar from '.';

interface IState {
  opened: boolean;
  message?: string;
  error?: any;
  timeout?: number;
}

let lastPromise = Promise.resolve();
let globalSnackbar: (message: string, error: any, timeout?: number) => Promise<void>;

export default class SnackbarGlobalProvider extends PureComponent<{}, IState> {
  promiseResolve: () => void;

  constructor(props: {}) {
    super(props);
    this.state = { opened: false };
  }

  static async show(message: string, error: any, timeout?: number): Promise<void> {
    if (!globalSnackbar) throw new Error('Please, initialize an Snackbar.Global before');

    //prevent an Snackbar to overhide another
    return lastPromise = lastPromise.then(async () => {
      await new Promise(resolve => setTimeout(() => resolve(), 500));
      return globalSnackbar(message, error, timeout);
    });
  }

  componentDidMount() {
    if (globalSnackbar) throw new Error('Only one Snackbar.Global can be initialized');
    globalSnackbar = this.show;
  }

  show = (message: string, error: any, timeout?: number): Promise<void> => {
    const result = new Promise<void>(resolve => {
      this.promiseResolve = resolve;
      this.setState({ opened: true, message, error, timeout });
    });

    result.then(() => this.setState({ opened: false }));
    return result;
  }

  handleClose = () => {
    this.promiseResolve && this.promiseResolve();
  }

  render() {
    const { opened, message, error, timeout } = this.state;

    return (
      <Snackbar
        opened={opened}
        message={message}
        error={error}
        timeout={timeout}
        onClose={this.handleClose}
      />
    );
  }
}
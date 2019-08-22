import React, { Fragment, PureComponent } from 'react';

import ChangePasswordDialog from './ChangePassword';
import LoginDialog from './Login';

export default class Dialogs extends PureComponent {
  render() {
    return (
      <Fragment>
        <LoginDialog />
        <ChangePasswordDialog />
      </Fragment>
    );
  }
}

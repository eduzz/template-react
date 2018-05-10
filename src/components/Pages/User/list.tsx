import AppToolbar from 'components/AppToolbar';
import { Typography } from 'material-ui';
import * as React from 'react';
import { Fragment } from 'react';

export default class UserListPage extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <AppToolbar title='User' />
        <Typography>User Content</Typography>
      </Fragment>
    );
  }
}
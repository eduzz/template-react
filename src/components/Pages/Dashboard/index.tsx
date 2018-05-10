import AppToolbar from 'components/AppToolbar';
import { IAppRoute } from 'interfaces/route';
import { Typography } from 'material-ui';
import React, { Fragment, PureComponent } from 'react';

export default class DashboardIndexPage extends PureComponent {
  public static routes: IAppRoute[] = [];

  render() {
    return (
      <Fragment>
        <AppToolbar title='Dashboard' />
        <Typography>Dashboard Content</Typography>
      </Fragment>
    );
  }
}
import { IAppRoute } from 'interfaces/route';
import { Typography } from 'material-ui';
import React, { PureComponent } from 'react';

export default class DashboardIndexPage extends PureComponent {
  public static routes: IAppRoute[] = [];

  render() {
    return (
      <Typography>
        Dashboard
      </Typography>
    );
  }
}
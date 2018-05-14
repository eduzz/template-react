import Toolbar from 'components/Toolbar';
import { IAppRoute } from 'interfaces/route';
import { Card, CardContent, Typography } from 'material-ui';
import React, { Fragment, PureComponent } from 'react';

export default class DashboardIndexPage extends PureComponent {
  public static routes: IAppRoute[] = [];

  render() {
    return (
      <Fragment>
        <Toolbar title='Dashboard' />

        <Card>
          <CardContent>
            <Typography>Content</Typography>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}
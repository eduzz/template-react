import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Filters extends PureComponent {
  render() {
    return (
      <Grid container>
        <Grid item>
          <Typography variant='subtitle1'>
            Filtros Ativos:
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
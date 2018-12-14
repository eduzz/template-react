import React, { PureComponent } from 'react';
import { WithStyles } from 'decorators/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
}))
export default class Loading extends PureComponent<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <Grid container justify='center'>
        <Grid item>
          <CircularProgress className={classes.progress} color='secondary' />
        </Grid>
      </Grid>
    );
  }
}
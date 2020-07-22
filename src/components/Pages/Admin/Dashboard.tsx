import Connect from '@eduzz/connect';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from 'components/Layout/Toolbar';
import React, { Fragment, memo } from 'react';

const useStyles = makeStyles({
  marginBottom: {
    marginBottom: 15
  }
});

const DashboardIndexPage = memo((props: {}) => {
  const classes = useStyles(props);

  return (
    <Fragment>
      <Toolbar title='Dashboard' />

      <Grid container spacing={3} className={classes.marginBottom}>
        <Grid item xs={12}>
          <Connect application='nutror' />
        </Grid>
      </Grid>
    </Fragment>
  );
});

export default DashboardIndexPage;

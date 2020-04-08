import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { memo } from 'react';

const useStyle = makeStyles({
  container: {
    height: 5
  }
});

const CardLoader = memo((props: { show: boolean }) => {
  const classes = useStyle(props);
  return <div className={classes.container}>{props.show && <LinearProgress color='primary' />}</div>;
});

export default CardLoader;

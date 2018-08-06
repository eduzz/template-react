import { Typography } from '@material-ui/core';
import { WithStyles } from 'decorators/withStyles';
import { MdiReactIconComponentType } from 'mdi-react';
import React, { PureComponent } from 'react';

interface IProps {
  icon: MdiReactIconComponentType;
  message: any;
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    textAlign: 'center',
    padding: '20px',
    width: 350,
    maxWidth: '100%',
    margin: 'auto'
  },
  icon: {
    opacity: 0.7
  },
  button: {
    marginTop: 20
  },
}))
export default class IconMessage extends PureComponent<IProps> {
  render() {
    const { message, classes } = this.props;

    return (
      <div className={classes.root}>
        <this.props.icon size={50} className={classes.icon} />
        <Typography variant='body1' className={classes.text}>{message}</Typography>
      </div>
    );
  }
}
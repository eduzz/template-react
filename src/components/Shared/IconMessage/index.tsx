import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import MoreIcon from 'mdi-react/MoreIcon';
import React, { PureComponent } from 'react';

interface IProps {
  icon: typeof MoreIcon;
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
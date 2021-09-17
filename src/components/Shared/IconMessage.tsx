import { memo } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import MoreIcon from 'mdi-react/MoreIcon';

import Typography from '@eduzz/houston-ui/Typography';

interface IProps {
  icon: typeof MoreIcon;
  message: any;
}

const useStyle = makeStyles({
  root: {
    textAlign: 'center',
    padding: '20px',
    width: 350,
    maxWidth: '100%',
    margin: 'auto'
  },
  icon: {
    opacity: 0.7
  }
});

const IconMessage = memo((props: IProps) => {
  const classes = useStyle(props);

  return (
    <div className={classes.root}>
      <props.icon size={50} className={classes.icon} />
      <Typography>{props.message}</Typography>
    </div>
  );
});

export default IconMessage;

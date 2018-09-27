import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

interface IProps {
  title: string;
  children?: any;
  classes?: any;
}

interface IState {
  open: boolean;
}

@WithStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 8,
  },
}))
export default class ModuleItem extends React.PureComponent<IProps, IState> {
  render() {
    const { title, classes } = this.props;

    return (
      <ListItem button className={classes.nested}>
        <Checkbox />
        <ListItemText primary={title} />
      </ListItem>
    );
  }
}
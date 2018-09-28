import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

interface IProps {
  lesson: any;
  classes?: any;
  onChange?: any;
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
  handleToggle = () => {
    const { onChange, lesson } = this.props;

    if (onChange) {
      onChange({
        ...lesson,
        checked: !lesson.checked,
      });
    }
  }

  render() {
    const { lesson, classes } = this.props;

    return (
      <ListItem button className={classes.nested}>
        <Checkbox checked={lesson.checked} onClick={this.handleToggle} />
        <ListItemText primary={lesson.title} />
      </ListItem>
    );
  }
}
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { WithStyles } from 'decorators/withStyles';
import { IUpsell } from 'interfaces/models/upsell';
import React from 'react';

interface IProps {
  classes?: any;
  lesson: IUpsell['courses'][0]['modules'][0]['lessons'][0];
  onChange: (lesson: IUpsell['courses'][0]['modules'][0]['lessons'][0]) => void;
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
      <ListItem className={classes.nested}>
        <Checkbox checked={lesson.checked} onClick={this.handleToggle} />
        <ListItemText primary={lesson.title} />
      </ListItem>
    );
  }
}
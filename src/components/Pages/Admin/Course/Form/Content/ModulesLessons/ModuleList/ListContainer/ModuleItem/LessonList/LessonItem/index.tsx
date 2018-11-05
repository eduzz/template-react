import React, { PureComponent } from 'react';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ILesson } from 'interfaces/models/lesson';
import { SortableElement } from 'react-sortable-hoc';
import DragHandle from '../../../../DragHandle';

interface IProps {
  classes?: any;
  lesson: ILesson;
}

@WithStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 6,
    borderTop: 'solid 1px #d5d5d5',
  },
}))
class LessonItem extends PureComponent<IProps> {
  render() {
    const { classes, lesson } = this.props;

    return (
      <ListItem className={classes.nested}>
        <DragHandle />
        <ListItemText inset primary={lesson.name} />
      </ListItem>
    );
  }
}

export default SortableElement(LessonItem);
import React, { PureComponent } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import { WithStyles } from 'decorators/withStyles';
import LessonItem from './LessonItem';
import { ILesson } from 'interfaces/models/lesson';

interface IProps {
  lessons: ILesson[];
  classes?: any;
}

@WithStyles({
  root: {
  },
})
class LessonList extends PureComponent<IProps> {
  render() {
    const { lessons } = this.props;

    return (
      <List component='div' disablePadding>
        {lessons && lessons.map((lesson, index: number) =>
          <LessonItem
            key={index}
            index={index}
            lesson={lesson}
          />
        )}
      </List>
    );
  }
}

export default SortableContainer(LessonList);
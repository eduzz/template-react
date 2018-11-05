import React, { PureComponent } from 'react';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ILesson } from 'interfaces/models/lesson';
import { SortableElement } from 'react-sortable-hoc';
import DragHandle from '../../../../DragHandle';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import DropdownMenu from 'components/Shared/DropdownMenu';

interface IProps {
  classes?: any;
  lesson: ILesson;
}

@WithStyles(theme => ({
  root: {
    padding: '8px 8px 0 8px',
  },
  nested: {
    border: 'solid 1px #d5d5d5',
    backgroundColor: '#fff',
  },
}))
class LessonItem extends PureComponent<IProps> {
  private actions = [{
    text: 'Editar',
    icon: SquareEditOutlineIcon,
    handler: () => { },
  }, {
    text: 'Excluir',
    icon: TrashCanIcon,
    handler: () => { },
  }];

  render() {
    const { classes, lesson } = this.props;

    return (
      <div className={classes.root}>
        <ListItem className={classes.nested}>
          <DragHandle />
          <ListItemText inset primary={lesson.name} />
          <DropdownMenu options={this.actions} />
        </ListItem>
      </div>
    );
  }
}

export default SortableElement(LessonItem);
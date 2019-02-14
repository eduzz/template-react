import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Confirm from 'components/Shared/Confirm';
import DropdownMenu from 'components/Shared/DropdownMenu';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { ILesson } from 'interfaces/models/lesson';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import moduleService from 'services/module';

import DragHandle from '../../../../DragHandle';
import OptionItem from 'components/Shared/DropdownMenu/OptionItem';

interface IProps {
  classes?: any;
  lesson: ILesson;
  moduleId: number;
  history?: any;
}

@WithRouter()
@WithStyles(theme => ({
  root: {
    padding: '8px 8px 0 8px',
  },
  nested: {
    border: 'solid 1px #d5d5d5',
    backgroundColor: '#f3f3f3',
  },
}))
class LessonItem extends PureComponent<IProps> {
  handleEdit = () => {
    this.props.history.push(`/aula/${this.props.lesson.id}/editar`);
  }

  handleDelete = async () => {
    const confirm = await Confirm.show(`Deseja excluir a aula?`);
    if (!confirm) return;

    const { moduleId, lesson } = this.props;

    moduleService.deleteLesson(moduleId, lesson.id);
  }

  render() {
    const { classes, lesson } = this.props;

    return (
      <div className={classes.root}>
        <ListItem className={classes.nested}>
          <DragHandle />
          <ListItemText inset primary={lesson.title} />
          <DropdownMenu>
            <OptionItem text='Editar' icon={SquareEditOutlineIcon} handler={this.handleEdit} />
            <OptionItem text='Excluir' icon={TrashCanIcon} handler={this.handleDelete} />
          </DropdownMenu>
        </ListItem>
      </div>
    );
  }
}

export default SortableElement(LessonItem);
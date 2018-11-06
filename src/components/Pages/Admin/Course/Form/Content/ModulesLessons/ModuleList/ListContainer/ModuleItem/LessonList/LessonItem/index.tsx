import React, { PureComponent } from 'react';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ILesson } from 'interfaces/models/lesson';
import { SortableElement } from 'react-sortable-hoc';
import DragHandle from '../../../../DragHandle';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import DropdownMenu, { IOption } from 'components/Shared/DropdownMenu';
import moduleService from 'services/module';
import Confirm from 'components/Shared/Confirm';

interface IProps {
  classes?: any;
  lesson: ILesson;
  moduleId: number;
}

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
  private readonly options: IOption[];

  constructor(props: IProps) {
    super(props);

    this.options = [{
      text: 'Editar',
      icon: SquareEditOutlineIcon,
      handler: () => { },
    }, {
      text: 'Excluir',
      icon: TrashCanIcon,
      handler: this.handleDelete,
    }];
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
          <ListItemText inset primary={lesson.name} />
          <DropdownMenu options={this.options} />
        </ListItem>
      </div>
    );
  }
}

export default SortableElement(LessonItem);
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Confirm from 'components/Shared/Confirm';
import DropdownMenu from 'components/Shared/DropdownMenu';
import OptionItem from 'components/Shared/DropdownMenu/OptionItem';
import { WithStyles } from 'decorators/withStyles';
import { IModule } from 'interfaces/models/module';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent } from 'react';
import { arrayMove, SortableElement, SortEnd } from 'react-sortable-hoc';
import moduleService from 'services/module';

import DragHandle from '../../DragHandle';
import LessonList from './LessonList';

interface IProps {
  classes?: any;
  module: IModule;
  index?: number;
}

interface IState {
  open: boolean;
}

@WithStyles(theme => ({
  root: {
    border: 'solid 1px #d5d5d5',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
}))
class ModuleItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { open: false };
  }

  handleEdit = () => {
    moduleService.editModule(this.props.module);
  }

  handleDelete = async () => {
    const confirm = await Confirm.show('Deseja excluir este módulo?');
    if (!confirm) return;

    moduleService.deleteModule(this.props.module.id);
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  }

  onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const { module } = this.props;

    moduleService.sortLessons(module.id, arrayMove(module.lessons, oldIndex, newIndex));
  }

  render() {
    const { module, classes } = this.props;

    return (
      <div className={classes.root}>
        <ListItem onClick={this.handleClick}>
          <DragHandle />
          <ListItemText inset primary={module.title} />
          <DropdownMenu>
            <OptionItem text='Editar' icon={SquareEditOutlineIcon} handler={this.handleEdit} />
            <OptionItem text='Excluir' icon={TrashCanIcon} handler={this.handleDelete} />
          </DropdownMenu>
        </ListItem>
        <Collapse in={this.state.open} timeout='auto' unmountOnExit>
          <LessonList
            lessons={module.lessons}
            module={module}
            onSortEnd={this.onSortEnd}
            useDragHandle
          />
        </Collapse>
      </div>
    );
  }
}

export default SortableElement(ModuleItem);
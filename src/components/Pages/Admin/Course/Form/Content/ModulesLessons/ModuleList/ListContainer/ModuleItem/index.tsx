import React, { PureComponent } from 'react';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { SortableElement, SortEnd } from 'react-sortable-hoc';
import { IModule } from 'interfaces/models/module';
import DragHandle from '../../DragHandle';
import LessonList from './LessonList';
import { arrayMove } from 'react-sortable-hoc';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import DropdownMenu, { IOption } from 'components/Shared/DropdownMenu';
import moduleService from 'services/module';
import Confirm from 'components/Shared/Confirm';

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
  private readonly options: IOption[];

  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
    };

    this.options = [
      {
        text: 'Editar',
        icon: SquareEditOutlineIcon,
        handler: this.handleEdit,
      },
      {
        text: 'Excluir',
        icon: TrashCanIcon,
        handler: this.handleDelete,
      }
    ];
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
          <ListItemText inset primary={module.name} />
          <DropdownMenu options={this.options} />
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
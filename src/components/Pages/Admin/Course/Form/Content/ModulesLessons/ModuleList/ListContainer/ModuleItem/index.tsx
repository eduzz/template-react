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
import DropdownMenu from 'components/Shared/DropdownMenu';

interface IProps {
  classes?: any;
  module: IModule;
  index?: number;
  onLessonSort: Function;
  editModule: Function;
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
  private actions = [{
    text: 'Editar',
    icon: SquareEditOutlineIcon,
    handler: () => {
      const { editModule, module } = this.props;

      editModule(module);
    },
  }, {
    text: 'Excluir',
    icon: TrashCanIcon,
    handler: () => { },
  }];

  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  }

  onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const { onLessonSort, module } = this.props;

    onLessonSort(module.id, arrayMove(module.lessons, oldIndex, newIndex));
  }

  render() {
    const { module, classes } = this.props;

    return (
      <div className={classes.root}>
        <ListItem onClick={this.handleClick}>
          <DragHandle />
          <ListItemText inset primary={module.name} />
          <DropdownMenu options={this.actions} />
        </ListItem>
        <Collapse in={this.state.open} timeout='auto' unmountOnExit>
          <LessonList
            lessons={module.lessons}
            onSortEnd={this.onSortEnd}
            useDragHandle
          />
        </Collapse>
      </div>
    );
  }
}

export default SortableElement(ModuleItem);
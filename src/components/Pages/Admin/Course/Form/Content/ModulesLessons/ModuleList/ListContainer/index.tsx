import React, { PureComponent } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import { IModule } from 'interfaces/models/module';
import ModuleItem from './ModuleItem';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import AddForm from './AddForm';

interface IProps {
  modules: IModule[];
  classes?: any;
  onLessonSort: Function;
  onAddModule: Function;
}

@WithStyles({
  root: {
  },
  addForm: {
    borderTop: 'solid 1px #d5d5d5',
    paddingTop: 20,
  },
})
class ListContainer extends PureComponent<IProps> {
  render() {
    const { modules, classes, onLessonSort } = this.props;

    return (
      <List className={classes.root}>
        {modules.map((module: IModule, index: number) => (
          <ModuleItem
            module={module}
            key={`item-${module.id}`}
            index={index}
            onLessonSort={onLessonSort}
          />
        ))}
        <ListItem className={classes.addForm}>
          <AddForm
            onAdd={this.props.onAddModule}
          />
        </ListItem>
      </List>
    );
  }
}

export default SortableContainer(ListContainer);
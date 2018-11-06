import React, { PureComponent } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import { IModule } from 'interfaces/models/module';
import ModuleItem from './ModuleItem';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  modules: IModule[];
  classes?: any;
  onLessonSort: Function;
}

@WithStyles({
  root: {
    padding: 8,
    backgroundColor: '#fff',
  },
  addForm: {
    paddingTop: 8,
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
      </List>
    );
  }
}

export default SortableContainer(ListContainer);
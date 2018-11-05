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
    // padding: '0 16px 16px 16px',
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
import React, { PureComponent } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
}

@WithStyles({
  root: {
    cursor: 'move',
  },
})
class DragHandle extends PureComponent<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <ListItemIcon className={classes.root}>
        <MenuIcon />
      </ListItemIcon>
    );
  }
}

export default SortableHandle(DragHandle);
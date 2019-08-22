import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';
import React, { PureComponent, SyntheticEvent } from 'react';

import DropdownMenuContext, { IDropdownMenuContext } from './context';

interface IProps extends IStyledProps {
  text: string;
  icon?: typeof DotsHorizontalIcon;
  handler: () => void;
}

@WithStyles({
  text: {
    paddingLeft: '0 !important'
  }
})
export default class OptionItem extends PureComponent<IProps> {
  static contextType = DropdownMenuContext;
  context: IDropdownMenuContext;

  onClick = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.context(this.props.handler);
  };

  render() {
    const { icon: Icon, text, classes } = this.props;

    return (
      <MenuItem onClick={this.onClick}>
        {!!Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText inset={!!Icon} primary={text} className={Icon ? classes.text : null} />
      </MenuItem>
    );
  }
}

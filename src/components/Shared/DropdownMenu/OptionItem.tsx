import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

import { IOption } from '.';

interface IProps {
  option: IOption;
  onClick: (option: IOption) => void;
  classes?: any;
}

@WithStyles({
  text: {
    paddingLeft: '0 !important'
  }
})
export default class OptionItem extends PureComponent<IProps> {

  onClick = () => {
    this.props.onClick(this.props.option);
  }

  render() {
    const { option, classes } = this.props;

    return (
      <MenuItem onClick={this.onClick}>
        {!!option.icon &&
          <ListItemIcon>
            <option.icon />
          </ListItemIcon>
        }
        <ListItemText
          inset
          primary={option.text}
          className={option.icon ? classes.text : null}
        />
      </MenuItem>
    );
  }
}
import { IconButton, Menu } from '@material-ui/core';
import { MdiReactIconComponentType } from 'mdi-react';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import * as React from 'react';

import OptionItem from './OptionItem';

export interface IOption {
  text: string;
  icon?: MdiReactIconComponentType;
  handler: () => void;
}

interface IState {
  targetElem?: HTMLElement;
}

interface IProps {
  options: IOption[];
}

export default class DropdownMenu extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ targetElem: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ targetElem: null });
  }

  handleClick = (option: IOption) => {
    this.handleClose();
    option.handler();
  }

  render() {
    const { targetElem } = this.state;
    const { options } = this.props;

    return (
      <div>
        <IconButton onClick={this.handleOpen} color='inherit'>
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={targetElem}
          open={!!targetElem}
          onClose={this.handleClose}
        >
          {options.map(option =>
            <OptionItem key={option.text} option={option} onClick={this.handleClick} />
          )}
        </Menu>
      </div>
    );
  }
}
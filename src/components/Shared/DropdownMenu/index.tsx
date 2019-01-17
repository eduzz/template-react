import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';
import * as React from 'react';

import OptionItem from './OptionItem';

export interface IOption {
  text: string;
  icon?: typeof DotsHorizontalIcon;
  handler: () => void;
}

interface IState {
  targetElem?: HTMLElement;
}

interface IProps extends Partial<MenuProps> {
  options: IOption[];
}

export default class DropdownMenu extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ targetElem: event.currentTarget });
  }

  handleClose = (event?: React.MouseEvent<HTMLElement>) => {
    event && event.stopPropagation();
    this.setState({ targetElem: null });
  }

  handleClick = (option: IOption) => {
    this.handleClose();
    option.handler();
  }

  render() {
    const { targetElem } = this.state;
    const { options, children, ...menuProps } = this.props;

    return (
      <div>
        {!!children &&
          <span onClick={this.handleOpen}>
            {children}
          </span>
        }

        {!children &&
          <IconButton onClick={this.handleOpen} color='inherit'>
            <DotsHorizontalIcon />
          </IconButton>
        }

        <Menu
          {...menuProps}
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
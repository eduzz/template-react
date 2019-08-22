import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';
import * as React from 'react';

import PermissionHide from '../PermissionHide';
import DropdownMenuContext from './context';
import OptionItem from './OptionItem';

export interface IOption {
  text: string;
  icon?: typeof DotsHorizontalIcon;
  handler: () => void;
}

interface IState {
  targetElem?: HTMLElement;
  options: React.ReactChild[];
  content: React.ReactChild[];
}

interface IProps extends Partial<MenuProps> {}

export default class DropdownMenu extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { options: [], content: [] };
  }

  static getDerivedStateFromProps({ children }: IProps, currentState: IState): IState {
    const options: React.ReactChild[] = [];
    const content: React.ReactChild[] = [];

    React.Children.toArray(children).forEach((child: any) => {
      if (child.type === OptionItem || child.type === PermissionHide) {
        options.push(child);
        return;
      }

      content.push(child);
    });

    return {
      ...currentState,
      options,
      content: content.length ? content : null
    };
  }

  handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ targetElem: event.currentTarget });
  };

  handleClose = (event?: React.MouseEvent<HTMLElement>) => {
    event && event.stopPropagation();
    this.setState({ targetElem: null });
  };

  handleClick = (handler: () => void) => {
    this.handleClose();
    handler();
  };

  render() {
    const { targetElem, options, content } = this.state;
    const { ...menuProps } = this.props;

    return (
      <div>
        {!!content && <span onClick={this.handleOpen}>{content}</span>}

        {!content && (
          <IconButton onClick={this.handleOpen} color='inherit'>
            <DotsHorizontalIcon />
          </IconButton>
        )}

        <Menu {...menuProps} anchorEl={targetElem} open={!!targetElem} onClose={this.handleClose}>
          <DropdownMenuContext.Provider value={this.handleClick}>{options}</DropdownMenuContext.Provider>
        </Menu>
      </div>
    );
  }
}

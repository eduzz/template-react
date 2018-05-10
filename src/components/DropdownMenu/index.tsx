import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from 'material-ui';
import { MdiReactIconComponentType } from 'mdi-react';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import * as React from 'react';

const styles = require('./index.css');

interface IState {
  targetElem?: HTMLElement;
}

interface IProps {
  options: {
    text: string;
    icon?: MdiReactIconComponentType;
    handler: () => void
  }[];
}

export default class DropdownMenu extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  open(event: any) {
    this.setState({ targetElem: event.currentTarget });
  }

  close(handler: Function) {
    this.setState({ targetElem: null });

    if (typeof handler !== 'function') return;
    handler();
  }

  render() {
    const { targetElem } = this.state;
    const { options } = this.props;

    return (
      <div className={styles.component}>
        <IconButton onClick={this.open.bind(this)} color='inherit'>
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={targetElem}
          open={!!targetElem}
          onClose={this.close.bind(this)}>
          {options.map((option, i) =>
            <MenuItem
              key={i}
              onClick={this.close.bind(this, option.handler)}>
              {!!option.icon &&
                <ListItemIcon>
                  <option.icon />
                </ListItemIcon>
              }
              <ListItemText className={option.icon ? 'text' : null} inset primary={option.text} />
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }
}
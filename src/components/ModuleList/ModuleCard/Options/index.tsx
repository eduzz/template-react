import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import IconButton from 'material-ui/IconButton';

interface IProps {
  onEdit: any;
  onDelete: any;
}

class Options extends Component<IProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleEdit = () => {
    this.handleClose();
    this.props.onEdit();
  }

  handleDelete = () => {
    this.handleClose();
    this.props.onDelete();
  }

  render() {
    const { anchorEl }: any = this.state;

    return (
      <div>
        <IconButton
          aria-haspopup='true'
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleEdit}>Editar</MenuItem>
          <MenuItem onClick={this.handleDelete}>Excluir</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default Options;
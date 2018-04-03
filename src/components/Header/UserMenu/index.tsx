import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import { logout } from 'actionCreators/auth';
import { enablePageGrid } from 'actionCreators/pageGrid';

const styles = require('./styles.css');

interface IProps {
  onEdit: any;
  onDelete: any;
  logout: any;
  enablePageGrid: any;
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

  handleLogout = () => {
    this.handleClose();
    this.props.logout();
  }

  handleLayoutEdit = () => {
    this.handleClose();
    this.props.enablePageGrid();
  }

  render() {
    const { anchorEl }: any = this.state;

    return (
      <div className={styles.component}>
        <nav
          className='user-menu'
          onClick={this.handleClick}
        >
          <div className='user-photo'>
            <img
              src='http://static1.purepeople.com.br/articles/2/18/48/42/@/2157162-ashton-kutcher-criou-um-abaixo-assinado-237x237-2.jpg'
              alt=''
            />
          </div>
        </nav>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>Meus Dados</MenuItem>
          <MenuItem>Meus Certificados</MenuItem>
          <MenuItem onClick={this.handleLayoutEdit}>Editar Layout</MenuItem>
          <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default connect(undefined, { logout, enablePageGrid })(Options);

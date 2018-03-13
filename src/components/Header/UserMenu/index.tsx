// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { logout } from 'actionCreators/auth';
// import v4 from 'uuid';

// const styles = require('./styles.css');

// interface IProps {
//   props: any;
//   dispatch: Function;
// }

// interface IState {
//   id: string;
// }

// class UserMenu extends Component<IProps, IState> {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       id: v4(),
//     };
//   }

//   render() {
//     return (
//       <div className={styles.component}>
//         <nav
//           id={this.state.id}
//           className='user-menu'
//           data-activates={this.state.id + '-menu'}
//         >
//           <div className='user-photo'>
//             <img
//               src='http://static1.purepeople.com.br/articles/2/18/48/42/@/2157162-ashton-kutcher-criou-um-abaixo-assinado-237x237-2.jpg'
//               alt=''
//             />
//           </div>
//         </nav>
//         <ul id={this.state.id + '-menu'} className='dropdown-content'>
//           <li>
//             <a>Meus Dados</a>
//           </li>
//           <li>
//             <a>Meus Certificados</a>
//           </li>
//           <li className='divider' />
//           <li>
//             <a onClick={() => this.props.dispatch(logout())}>
//               Sair
//             </a>
//           </li>
//         </ul>
//       </div>
//     );
//   }
// }
// export default connect()(UserMenu);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import { logout } from 'actionCreators/auth';

const styles = require('./styles.css');

interface IProps {
  onEdit: any;
  onDelete: any;
  logout: any;
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
          <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({ logout }, dispatch),
});

export default connect(undefined, mapDispatchToProps)(Options);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import actionCreators from 'actionCreators';
import v4 from 'uuid';

const styles = require('./styles.css');

interface IProps {
  props: any;
  dispatch: Function;
}

interface IState {
  id: string;
}

class UserMenu extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: v4(),
    };
  }

  render() {
    return (
      <div className={styles.component}>
        <nav
          id={this.state.id}
          className='user-menu'
          data-activates={this.state.id + '-menu'}
        >
          <div className='user-photo'>
            <img
              src='http://static1.purepeople.com.br/articles/2/18/48/42/@/2157162-ashton-kutcher-criou-um-abaixo-assinado-237x237-2.jpg'
              alt=''
            />
          </div>
        </nav>
        <ul id={this.state.id + '-menu'} className='dropdown-content'>
          <li>
            <a>Meus Dados</a>
          </li>
          <li>
            <a>Meus Certificados</a>
          </li>
          <li className='divider' />
          <li>
            <a onClick={() => this.props.dispatch(actionCreators.logout())}>
              Sair
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
export default connect()(UserMenu);

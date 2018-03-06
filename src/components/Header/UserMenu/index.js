import React, { Component } from 'react';
import { connect } from 'react-redux';
import actionCreators from 'actionCreators';
import jquery from 'jquery';
import v4 from 'uuid';
import styles from './styles.css';

class UserMenu extends Component {
    constructor() {
        super();

        this.id = v4();
    }

    componentDidMount() {
        jquery('#' + this.id).dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false,
            gutter: 0,
            belowOrigin: true,
            alignment: 'left',
            stopPropagation: false,
        });
    }

    render() {
        return (
            <div className={styles.component}>
                <nav id={this.id} className='user-menu' data-activates={this.id + '-menu'}>
            		<div className='user-photo'><img src='http://static1.purepeople.com.br/articles/2/18/48/42/@/2157162-ashton-kutcher-criou-um-abaixo-assinado-237x237-2.jpg' alt=''/></div>
                </nav>
                <ul id={this.id + '-menu'} className='dropdown-content'>
                    <li><a>Meus Dados</a></li>
                    <li><a>Meus Certificados</a></li>
                    <li className='divider'></li>
                    <li><a onClick={() => this.props.dispatch(actionCreators.logout())}>Sair</a></li>
                </ul>
            </div>
        );
    }
}
export default connect()(UserMenu);

import React from 'react';
import styles from './styles.css';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className={styles.component}>
        <div className="container">
            <a className="header-logo">
                <img src="https://app.nutror.com/assets/img/super.png" alt="" />
            </a>
            <div class="header-actions">
                <Link to='/producer/courses'   className="button outline-light">
                    <Icon name='students' />
                    <span>Área do Produtor</span>
                </Link>
                <Link to='/student/courses'   className="button outline-light">
                    <Icon name='library' />
                    <span>Área de Ensino</span>
                </Link>
                 <nav className="user-menu" data-activates='dropdown1'>
            		<div className="user-photo"><img src="http://static1.purepeople.com.br/articles/2/18/48/42/@/2157162-ashton-kutcher-criou-um-abaixo-assinado-237x237-2.jpg" alt=""/></div>
                    <ul id='dropdown1' className='dropdown-content'>
        			    <li><a href="#!">Meus Dados</a></li>
        			    <li><a href="#!">Meus Certificados</a></li>
        			    <li className="divider"></li>
        			    <li><a href="#!">Sair</a></li>
        			</ul>
                </nav> 
            </div>
        </div>
    </header>
);

export default Header;

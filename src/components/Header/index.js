import React from 'react';
import styles from './styles.css';

const Header = () => (
    <header className={styles.component}>
        <div className="container">
            <a className="header-logo">
                <img src="https://app.nutror.com/assets/img/super.png" alt="" />
            </a>
            <nav className="user-menu" data-activates='dropdown1'>
        		<div className="user-photo"><img src="http://static1.purepeople.com.br/articles/2/18/48/42/@/2157162-ashton-kutcher-criou-um-abaixo-assinado-237x237-2.jpg" alt=""/></div>
            </nav>
            <ul id='dropdown1' class='dropdown-content'>
			    <li><a href="#!">Meus Dados</a></li>
			    <li><a href="#!">Meus Certificados</a></li>
			    <li class="divider"></li>
			    <li><a href="#!">Sair</a></li>
			</ul>
        </div>
    </header>
);

export default Header;

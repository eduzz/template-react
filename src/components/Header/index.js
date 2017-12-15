import React from 'react';
import UserMenu from './UserMenu';
import styles from './styles.css';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className={styles.component}>
        <div className="container">
            <a className="header-logo">
                <img src="https://app.nutror.com/assets/img/super.png" alt="" />
            </a>
            <div className="header-actions">
                <Link to='/producer/courses'   className="header-button">
                    <Icon name='user' />
                    <span>Área do Produtor</span>
                </Link>
                <Link to='/student/courses'   className="header-button">
                    <Icon name='library' />
                    <span>Área de Ensino</span>
                </Link>
                <UserMenu />
            </div>
        </div>
    </header>
);

export default Header;

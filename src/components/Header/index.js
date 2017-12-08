import React from 'react';
import styles from './styles.css';

const Header = () => (
    <header className={styles.component}>
        <div className="container">
            <a className="header-logo">
                <img src="https://app.nutror.com/assets/img/super.png" alt="" />
            </a>
            <div className="header-content"></div>
        </div>
    </header>
);

export default Header;

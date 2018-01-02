import React from 'react';
import UserMenu from './UserMenu';
import styles from './styles.css';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className={styles.component}>
        <div className="container">
            <a className="header-logo">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376 376">
                  <path d="M186 5C86 5 5 86 5 186s81 181 181 181 181-81 181-181S286 5 186 5zm-46.9 174.3v67l-46.9 46.9V92.1l174.3 181-127.4-93.8zm147.5 100.6l-174.3-181 127.4 93.9v-67l46.9-46.9v201z" fill="#fff"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1094 343">
                  <path d="M210.6 149.2c0-26.3-.4-73.5-85.1-73.5-4.9 0-46.8 0-76.6 15.6C33.7 98.9 31 106.9 31 123.8v179.6c0 7.6 2.2 8.9 8.5 8.5h21.8c6.2 0 9.4-.9 9.4-8.9V138.5c0-11.1.4-39.7 48.1-39.7 52.1 0 52.1 33.4 52.1 54.4v149.7c0 8 2.7 8.9 9.8 8.9h24.5c4.9-.9 5.3-4.9 5.3-8.9V149.2h.1zm212.2-59.7c-.4-6.7-2.7-8.5-9.8-8.5-8.5 0-23.2 0-24.5.4-4.9.9-5.3 4.5-5.3 8.9v152.4c0 21.4 0 47.7-45.9 47.7-49 0-49.5-32.1-49.9-53V89.5c0-7.6-2.7-8.5-8.9-8.5h-23.2c-6.7 0-8 2.2-8 8v157.7c0 22.3 4 39.2 20.5 53 10.7 8.5 27.2 17.4 63.3 17.4 41.4 0 66.4-12 73.1-15.6 16.9-10.2 18.3-22.7 18.7-45v-167h-.1zm138.6 11.1c6.7 0 6.7-1.3 6.7-13.4 0-5.8-1.8-6.2-7.1-6.2h-38.8V26.7c0-5.3-.4-11.1-4.9-11.1-1.3 0-3.1.9-7.6 4.9l-20.5 18.3c-5.3 5.3-6.7 7.6-6.7 15.6V81h-23.6c-6.7.4-6.7 1.3-6.7 12.9 0 6.2.9 6.7 6.7 6.7h23.6v152.8c0 13.8.4 28.5 10.7 42.3 9.4 12 25.4 20.5 46.8 20.5 10.2 0 34.8-3.1 34.8-14.7 0-2.7-.9-8.9-8.9-8.9-1.8 0-9.8.4-11.6.4-13.4 0-21.8-6.2-26.7-15.6-4.9-8.5-4.9-13.4-5.3-32.1V100.6h39.1zm74.6 28.1c.4-11.6.9-31.2 27.2-31.2 12.9 0 18.7 5.3 24.5 11.1 7.6 8.5 10.7 12 18.7 12 11.1 0 18.3-8.9 18.3-19.2 0-20.9-24.1-25.8-45.9-25.8-29 0-57.5 7.6-70.8 15.6-9.8 5.8-11.6 11.1-11.6 26.7v186.3c0 7.1 2.7 7.6 8.9 7.6H628c5.3 0 7.6-.4 8-7.6V128.7zm287.6 66.4C922.3 143.4 892 75.7 822 75.7c-64.6 0-102 58.8-102 121.2 0 59.7 35.2 120.3 102.5 120.3 65.9 0 102-62.4 101.1-122.1zm-42.3-3.1c2.7 61.5-23.6 98-57 98-32.1 0-62.8-37-62.8-99.4 0-53 22.7-90 57.9-90 29.8 0 59.2 29.9 61.9 91.4zm106-63.3c.4-11.6.9-31.2 27.2-31.2 12.9 0 18.7 5.3 24.5 11.1 7.6 8.5 10.7 12 18.7 12 11.1 0 18.3-8.9 18.3-19.2 0-20.9-24.1-25.8-45.9-25.8-29 0-57.5 7.6-70.8 15.6-9.8 5.8-11.6 11.1-11.6 26.7v186.3c0 7.1 2.7 7.6 8.9 7.6h22.7c5.3 0 7.6-.4 8-7.6V128.7z" fill="#fff"/>
                </svg>
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

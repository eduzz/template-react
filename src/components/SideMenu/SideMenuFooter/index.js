import React from 'react';
import Icon from 'components/Icon';
import styles from './styles.css';

const SideMenuFooter = () => (
    <nav className={styles.component}>
        <ul>
            <li>
                <a href="">
                    <Icon name='exit' />
                    Sair
                </a>
            </li>
            <li>
                <a href="">
                    <Icon name='gears' />
                    Config
                </a>
            </li>
            <li>
                <a href="">
                    <Icon name='help' />
                    Ajuda
                </a>
            </li>
        </ul>
    </nav>
);

export default SideMenuFooter;

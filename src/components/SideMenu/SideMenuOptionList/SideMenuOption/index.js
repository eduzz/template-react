import React from 'react';
import Icon from 'components/Icon';
import styles from './styles.css';

const SideMenuOption = ({ data, children }) => (
    <li className={styles.component}>
        <a href="" className="nav-button">
            <Icon name={data.icon} />
            {data.title}
        </a>
        <ul className="submenu">
            {children}
        </ul>
    </li>
);

export default SideMenuOption;

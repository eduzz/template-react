import React from 'react';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';
import styles from './styles.css';

const SideMenuFooter = () => (
  <nav className={styles.component}>
    <ul>
      <li>
        <Link
          to="/login"
          onClick={() => {
            window.localStorage.removeItem('authToken');
          }}
        >
          <Icon name="exit" />
          Sair
        </Link>
      </li>
      <li>
        <a href="">
          <Icon name="gears" />
          Config
        </a>
      </li>
      <li>
        <a href="">
          <Icon name="help" />
          Ajuda
        </a>
      </li>
    </ul>
  </nav>
);

export default SideMenuFooter;

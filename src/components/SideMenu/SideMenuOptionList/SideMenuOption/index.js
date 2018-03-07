import React from 'react';
import Icon from 'components/Icon';
import styles from './styles.css';
import { Link } from 'react-router-dom';

function SideMenuOption({ data, children }) {
  if (children) {
    return getCollapsible({ data, children });
  } else {
    return getNormal({ data });
  }
}

const getNormal = ({ data }) => (
  <li className={styles.component}>
    <Link to={data.to} className="nav-button">
      <Icon name={data.icon} />
      {data.title}
    </Link>
  </li>
);

const getCollapsible = ({ data, children }) => (
  <li className={styles.component}>
    <ul className="collapsible" data-collapsible="accordion">
      <li>
        <div className="collapsible-header nav-button">
          <Icon name={data.icon} />
          {data.title}
        </div>
        <ul className="collapsible-body submenu">{children}</ul>
      </li>
    </ul>
  </li>
);

export default SideMenuOption;

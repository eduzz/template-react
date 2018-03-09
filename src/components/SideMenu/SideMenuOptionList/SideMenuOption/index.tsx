import React from 'react';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';

const styles = require('./styles.css');

function SideMenuOption({ data, children }: any) {
  if (children) {
    return getCollapsible({ data, children });
  } else {
    return getNormal({ data });
  }
}

const getNormal = ({ data }: any) => (
  <li className={styles.component}>
    <Link to={data.to} className='nav-button'>
      <Icon name={data.icon} />
      {data.title}
    </Link>
  </li>
);

const getCollapsible = ({ data, children }: any) => (
  <li className={styles.component}>
    <ul className='collapsible' data-collapsible='accordion'>
      <li>
        <div className='collapsible-header nav-button'>
          <Icon name={data.icon} />
          {data.title}
        </div>
        <ul className='collapsible-body submenu'>{children}</ul>
      </li>
    </ul>
  </li>
);

export default SideMenuOption;

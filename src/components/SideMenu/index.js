import React from 'react';
import Welcome from './Welcome';
import SideMenuFooter from './SideMenuFooter';
import SideMenuOptionList from './SideMenuOptionList';
import styles from './styles.css';

const SideMenu = () => (
  <aside className={styles.component}>
    <div className="container">
      <Welcome />
      <SideMenuOptionList />
      <SideMenuFooter />
    </div>
  </aside>
);

export default SideMenu;

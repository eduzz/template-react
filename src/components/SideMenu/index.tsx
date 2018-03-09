import React from 'react';
import Welcome from './Welcome';
import SideMenuFooter from './SideMenuFooter';
import SideMenuOptionList from './SideMenuOptionList';

const styles = require('./styles.css');

const sideMenu = () => (
  <aside className={styles.component}>
    <div className='container'>
      <Welcome />
      <SideMenuOptionList />
      <SideMenuFooter />
    </div>
  </aside>
);

export default sideMenu;

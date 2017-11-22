import React from 'react';
import Welcome from './Welcome';
import SideMenuFooter from './SideMenuFooter';
import SideMenuOptionList from './SideMenuOptionList';

const SideMenu = () => (
    <aside className="side-nav">
        <div className="container">
            <Welcome />
            <SideMenuOptionList />
            <SideMenuFooter />
        </div>
    </aside>
);

export default SideMenu;

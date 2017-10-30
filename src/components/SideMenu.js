import React from 'react';
import Welcome from './Welcome';
import SideMenuFooter from './SideMenuFooter';
import OptionList from './OptionList';

const SideMenu = () => (
    <aside className="side-nav">
        <div className="container">
            <Welcome />
            <OptionList />
            <SideMenuFooter />
        </div>
    </aside>
);

export default SideMenu;

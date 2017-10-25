import React from 'react';
import Welcome from './Welcome';
import Footer from './Footer';
import OptionList from './OptionList';

const SideMenu = () => (
    <aside className="side-nav">
        <div className="container">
            <Welcome />
            <OptionList />
            <Footer />
        </div>
    </aside>
);

export default SideMenu;

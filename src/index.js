import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import MyCourses from './components/MyCourses';

import './assets/css/css.css';

ReactDOM.render(
    <div>
        <Header />
        <SideMenu />
        <MyCourses />
    </div>,
    document.getElementById('root')
);

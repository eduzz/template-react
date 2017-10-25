import React from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import MyCourses from './components/MyCourses';
import configureStore from './configureStore';

import 'materialize-css';
import './assets/css/materialize.css';
import './assets/css/css.css';

const store = configureStore();
render(
    <div>
        <Header />
        <SideMenu />
        <MyCourses />
    </div>,
    document.getElementById('root')
);

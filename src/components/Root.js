import React from 'react';
import { Provider } from 'react-redux';
import Header from './Header';
import SideMenu from './SideMenu';
import MyCourses from './MyCourses';

const Root = ({ store }) => (
    <Provider store={store}>
    	<div>
	    	<Header />
	        <SideMenu />
	        <MyCourses />
	    </div>
  	</Provider>
);

export default Root;

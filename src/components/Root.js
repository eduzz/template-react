import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, HashRouter, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';
import Courses from './Courses';
import CourseEdit from './CourseEdit';

const Root = ({ store }) => (
    <Provider store={store}>
    	<HashRouter>
	    	<div>
		    	<Header />
		        <SideMenu />

		        <Switch>
		        	<Redirect exact from='/' to='/courses' />
		        	<Route exact path='/courses' component={ Courses } />
		        	<Route exact path='/courses/edit/:courseID' component={ CourseEdit } />
		        	<Courses />
		        </Switch>

		        <Footer />
		    </div>
		</HashRouter>
  	</Provider>
);

export default Root;

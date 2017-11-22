import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';
import Footer from 'components/Footer';
import Courses from './Courses';
import CourseEdit from './CourseEdit';

const Producer = () => (
	<div>
		<Header />
		<SideMenu />

		<Switch>
			<Redirect exact from='/producer' to='/producer/courses' />
	    	<Route exact path='/producer/courses' component={ Courses } />
	    	<Route exact path='/producer/courses/edit/:courseID' component={ CourseEdit } />
	    </Switch>

	    <Footer />
	</div>
);

export default Producer;

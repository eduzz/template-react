import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';
import Courses from './Courses';
import AdminComments from './Admin/Comments';
import CourseEdit from '../containers/CourseEdit';

const Producer = () => (
	<div>
		<Header />
		<SideMenu />

		<Switch>
			<Redirect exact from='/producer' to='/producer/courses' />
	    	<Route exact path='/producer/courses' component={ Courses } />
	    	<Route exact path='/producer/comments' component={ AdminComments } />
	    	<Route exact path='/producer/courses/edit/:courseID' component={ CourseEdit } />
	    </Switch>

	    <Footer />
	</div>
);

export default Producer;
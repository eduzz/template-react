import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';
import Footer from 'components/Footer';
import Courses from './Courses';
import CourseEdit from './CourseEdit';
import Packages from './Packages';
import Comments from './Comments';
import Students from './Students';
import Invites from './Invites';
import News from './News';

const Producer = () => (
	<div>
		<Header />
		<SideMenu />

		<Switch>
			<Redirect exact from='/producer' to='/producer/courses' />
	    	<Route exact path='/producer/courses' component={ Courses } />
	    	<Route exact path='/producer/courses/edit/:courseID' component={ CourseEdit } />
			<Route exact path='/producer/packages' component={ Packages } />
			<Route exact path='/producer/comments' component={ Comments } />
			<Route exact path='/producer/students' component={ Students } />
			<Route exact path='/producer/invites' component={ Invites } />
			<Route exact path='/producer/news' component={ News } />
	    </Switch>

	    <Footer />
	</div>
);

export default Producer;

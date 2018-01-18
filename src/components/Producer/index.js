import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';
import Footer from 'components/Footer';
import Courses from './Courses';
import Course from './Course';
import Packages from './Packages';
import Comments from './Comments';
import Students from './Students';
import Invites from './Invites';
import News from './News';
import Upsells from './Upsells';

const Producer = () => (
	<div>
		<Header />
		<SideMenu />

		<Switch>
			<Redirect exact from='/producer' to='/producer/courses' />
	    	<Route exact path='/producer/courses' component={ Courses } />
	    	<Route exact path='/producer/courses/:courseID' component={ Course } />
			<Route exact path='/producer/packages' component={ Packages } />
			<Route exact path='/producer/comments' component={ Comments } />
			<Route exact path='/producer/students' component={ Students } />
			<Route exact path='/producer/invites' component={ Invites } />
			<Route exact path='/producer/news' component={ News } />
			<Route exact path='/producer/upsells' component={ Upsells } />
	    </Switch>

	    <Footer />
	</div>
);

export default Producer;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StudentCourses from './StudentCourses';

const Student = () => (
	<div className="template-black">
		<Header />

		<Switch>
			<Redirect exact from='/student' to='/student/courses' />
	    	<Route exact path='/student/courses' component={ StudentCourses } />
	    </Switch>

	    <Footer />
	</div>
);

export default Student;
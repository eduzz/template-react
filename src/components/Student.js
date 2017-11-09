import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StudentCourses from './StudentCourses';
import StudentCourseDetails from './StudentCourseDetails';

const Student = () => (
	<div className="template-black">
		<Header />

		<Switch>
			<Redirect exact from='/student' to='/student/courses' />
	    	<Route exact path='/student/courses' component={ StudentCourses } />
	    	<Route exact path='/student/courses/:courseID' component={ StudentCourseDetails } />
	    </Switch>

	    <Footer />
	</div>
);

export default Student;
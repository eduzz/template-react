import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'components/Header';
// import Footer from 'components/Footer';
import Courses from './Courses';
import Course from './Course';
// import StudentLesson from './StudentLesson';

const student = () => (
  <div className='template-black'>
    <Header />

    <Switch>
      <Redirect exact from='/student' to='/student/courses' />
      <Route exact path='/student/courses' component={Courses} />
      <Route exact path='/student/courses/:courseId' component={Course} />
      {/* <Route exact path='/student/courses/lesson/:lessonId' component={StudentLesson} /> */}
    </Switch>

    {/* <Footer /> */}
  </div>
);

export default student;

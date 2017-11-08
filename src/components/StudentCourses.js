import React from 'react';
import VisibleCourseCardGrid from '../containers/VisibleCourseCardGrid';
import CoursesSearch from '../containers/CoursesSearch';
import CoursesFilters from './CoursesFilters';

const StudentCourses = () => (
    <section className="student-content">
        <div className="container">
        	<div className="search-bar">
	            <CoursesSearch />
	            <CoursesFilters />
        	</div>
            <VisibleCourseCardGrid />
        </div>
    </section>
);

export default StudentCourses;
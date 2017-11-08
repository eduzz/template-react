import React from 'react';
import PageHeader from './PageHeader';
import VisibleCourseCardGrid from '../containers/VisibleCourseCardGrid';
import CoursesSearch from '../containers/CoursesSearch';
import CoursesFilters from './CoursesFilters';

const Courses = () => (
    <section className="page-content my-courses">
        <div className="container">
            <PageHeader />
            <div className="search-bar">
                <CoursesSearch />
                <CoursesFilters />
            </div>
            <VisibleCourseCardGrid />
        </div>
    </section>
);

export default Courses;

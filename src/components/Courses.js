import React from 'react';
import PageHeader from './PageHeader';
import VisibleCourseCardGrid from '../containers/VisibleCourseCardGrid';
import CoursesSearch from '../containers/CoursesSearch';

const Courses = () => (
    <section className="page-content my-courses">
        <div className="container">
            <PageHeader />
            <CoursesSearch />
            <VisibleCourseCardGrid />
        </div>
    </section>
);

export default Courses;

import React from 'react';
import PageHeader from './PageHeader';
import VisibleCourseList from './VisibleCourseList';
import CoursesSearch from './CoursesSearch';
import Footer from '../Footer';

const MyCourses = () => (
    <section className="page-content my-courses">
        <div className="container">
            <PageHeader />
            <CoursesSearch />
            <VisibleCourseList />
            <Footer />
        </div>
    </section>
);

export default MyCourses;

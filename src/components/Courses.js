import React from 'react';
import PageHeader from './PageHeader';
import VisibleCourseCardGrid from '../containers/VisibleCourseCardGrid';
import CoursesSearch from '../containers/CoursesSearch';
import { FiltersMenu, ProducerFilter, PeriodFilter, StatusFilter, CategoryFilter, TagsFilter } from './Filters';

const Courses = () => (
    <section className="page-content my-courses">
        <div className="container">
            <PageHeader />
            <CoursesSearch />
            <VisibleCourseCardGrid />
            <FiltersMenu>
                <ProducerFilter active />
                <PeriodFilter />
                <StatusFilter active />
                <CategoryFilter />
                <TagsFilter />
            </FiltersMenu>
        </div>
    </section>
);

export default Courses;

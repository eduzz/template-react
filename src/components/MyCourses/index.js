import React from 'react';
import PageHeader from './PageHeader';
import VisibleCardList from './VisibleCardList';
import Search from '../Search';
import Footer from '../Footer';

const MyCourses = () => (
    <section className="page-content my-courses">
        <div className="container">
            <PageHeader />
            <Search />
            <VisibleCardList />
            <Footer />
        </div>
    </section>
);

export default MyCourses;

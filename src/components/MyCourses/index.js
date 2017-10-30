import React from 'react';
import PageHeader from './PageHeader';
import CardList from './CardList';
import Search from './Search';
import Footer from '../Footer';

const MyCourses = () => (
    <section className="page-content my-courses">
        <div className="container">
            <PageHeader />
            <Search />
            <CardList />
            <Footer />
        </div>
    </section>
);

export default MyCourses;
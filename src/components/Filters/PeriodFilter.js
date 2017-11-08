import React from 'react';
import Section from './Section';

const PeriodFilter = ({ active }) => (
    <Section active={ active } title='Período'>
        <label htmlFor=''>de:</label>
        <input type='text' className='datepicker' />
        <label htmlFor=''>até</label>
        <input type='text' className='datepicker' />
    </Section>
);

export default PeriodFilter;

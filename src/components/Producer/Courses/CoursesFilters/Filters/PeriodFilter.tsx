import React from 'react';
import Section from './Section';

const periodFilter = ({ active, title }: any) => (
  <Section active={active} title={title ? title : 'Período'}>
    <label htmlFor=''>de:</label>
    <input type='text' className='datepicker' />
    <label htmlFor=''>até</label>
    <input type='text' className='datepicker' />
  </Section>
);

export default periodFilter;

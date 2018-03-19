import React from 'react';
import Section from './Section';

const tagsFilter = ({ active }: any) => (
  <Section active={active} title='Tags'>
    <div className='input-field'>
      <input id='course-name' type='text' placeholder='Digite o nome' />
    </div>
  </Section>
);

export default tagsFilter;

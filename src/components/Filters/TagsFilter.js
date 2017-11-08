import React from 'react';
import Section from './Section';

const TagsFilter = ({ active }) => (
    <Section active={ active } title='Tags'>
        <div className='input-field'>
            <input id='course-name' type='text' placeholder='Digite o nome' />
        </div>
    </Section>
);

export default TagsFilter;

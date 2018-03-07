import React from 'react';
import Section from './Section';

const ProducerFilter = ({ active }) => (
  <Section active={active} title="Produtor">
    <div className="input-field">
      <input id="course-name" type="text" placeholder="Digite o nome" />
    </div>
  </Section>
);

export default ProducerFilter;

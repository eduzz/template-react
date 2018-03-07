import React from 'react';
import Section from './Section';

const StatusFilter = ({ active }) => (
  <Section active={active} title="Status">
    <div className="switch">
      <label>
        <input type="checkbox" id="filter-status-lated" />
        <span className="lever" />
      </label>
      <label htmlFor="filter-status-lated">Em Atraso</label>
    </div>

    <div className="switch">
      <label>
        <input type="checkbox" id="filter-status-paid" />
        <span className="lever" />
      </label>
      <label htmlFor="filter-status-paid">Paga</label>
    </div>

    <div className="switch">
      <label>
        <input type="checkbox" id="filter-status-opened" />
        <span className="lever" />
      </label>
      <label htmlFor="filter-status-opened">Aberta</label>
    </div>

    <div className="switch">
      <label>
        <input type="checkbox" id="filter-status-canceled" />
        <span className="lever" />
      </label>
      <label htmlFor="filter-status-canceled">Cancelada</label>
    </div>
  </Section>
);

export default StatusFilter;

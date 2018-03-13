import React from 'react';

const section = ({ children, title, active }: any) => (
  <ul className='collapsible block' data-collapsible='accordion'>
    <li>
      <div
        className={`block-header collapsible-header ${active ? 'active' : ''}`}
      >
        <label htmlFor=''>{title}</label>
      </div>
      <div className='collapsible-body block-content'>{children}</div>
    </li>
  </ul>
);

export default section;

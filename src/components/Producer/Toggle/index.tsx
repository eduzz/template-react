import React from 'react';

const toggle = (props: any) => (
  <a
    className='switch'
    onClick={e => {
      props.onClick(e);
      e.preventDefault();
    }}
  >
    <label>
      <input type='checkbox' defaultChecked={props.toggled} id={props.id} />
      <span className='lever' />
    </label>
    <label htmlFor={props.id}>
      <h3 className='form-block-title'>{props.title}</h3>
      <p className='check-description'>{props.description}</p>
    </label>
  </a>
);

export default toggle;

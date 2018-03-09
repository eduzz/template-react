import React from 'react';

const search = ({ onSearch }: any) => (
  <div className='input-field'>
    <input
      id='icon_search'
      type='text'
      onKeyUp={(input: any) => onSearch(input.target.value)}
    />
    <label htmlFor='icon_search'>Pesquisar</label>
  </div>
);

export default search;

import React from 'react';

const Search = ({ onSearch }) => (
    <div className="input-field">
        <input id="icon_search" type="text" rel="search" onKeyUp={ input => onSearch(input.target.value) } />
        <label htmlFor="icon_search">Pesquisar</label>
    </div>
);

export default Search;

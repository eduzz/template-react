import React from 'react';
import Icon from './Icon';

const Search = ({ onSearch }) => (
    <div className="search-bar">
        <div className="input-field">
            <input id="icon_search" type="text" rel="search" onKeyUp={ input => onSearch(input.target.value) } />
            <label htmlFor="icon_search">Pesquisar</label>
        </div>
        <a className="button waves-light waves-effect">
            <Icon name='package' />
            <span>Filtros</span>
        </a>
    </div>
);

export default Search;

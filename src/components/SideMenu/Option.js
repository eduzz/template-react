import React from 'react';
import Icon from '../Icon';

const Option = ({ data, children }) => (
    <li>
        <a href="" className="nav-button">
            <Icon name={data.icon} />
            {data.title}
        </a>
        <ul className="submenu">
            {children}
        </ul>
    </li>
);

export default Option;

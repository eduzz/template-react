import React, { Component } from 'react';
import jquery from 'jquery';
import Icon from './Icon';

const Tabs = ({ children }) => (
    <div>
        <ul className='tabs'>
            {children.map((pane, key) =>
                <li key={ key } className='tab'>
                    <a className='tab-button waves-effect waves-light' href={ `#${pane.props.id}` }>
                        <Icon name={ pane.props.icon } />
                        { pane.props.title }
                    </a>
                </li>
            )}
        </ul>
        { children }
    </div>
);

export default Tabs;

export const Pane = ({ children, id, title, icon }) => (
    <div id={ id } className='col s12'>
        { children }
    </div>
);

import React, { Component } from 'react';
import jquery from 'jquery';
import Icon from './Icon';

class Tabs extends Component {
    componentDidMount() {
        jquery('ul.tabs').tabs();
    }

    render() {
        const panes = this.props.children.length ? this.props.children : [this.props.children];

        return (
            <div>
                <ul className='tabs'>
                    {panes.map((pane, key) =>
                        <li key={ key } className='tab'>
                            <a className='tab-button waves-effect waves-light' href={`#${pane.props.id}`} onClick={e => e.preventDefault()} >
                                <Icon name={ pane.props.icon } />
                                { pane.props.title }
                            </a>
                        </li>
                    )}
                </ul>
                { panes }
            </div>
        );
    }
};

export default Tabs;

export const Pane = ({ children, id, title, icon }) => (
    <div id={ id } className='col s12'>
        { children }
    </div>
);

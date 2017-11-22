import React, { Component } from 'react';
import jquery from 'jquery';
import Icon from 'components/Icon';

export class Tabs extends Component {
    componentDidMount() {
        jquery('#'+this.props.id).tabs();
    }

    render() {
        const panes = this.props.children.length ? [...this.props.children] : [{...this.props.children}];
        const TabsID = this.props.id || 'tab';

        return (
            <div>
                <ul className='tabs' id={this.props.id}>
                    {panes.map((pane, key) =>
                        <li key={ key } className='tab'>
                            <a className='tab-button waves-effect waves-light' href={`#${TabsID}-${key}`} onClick={e => e.preventDefault()} >
                                <Icon name={ pane.props.icon } />
                                { pane.props.title }
                            </a>
                        </li>
                    )}
                </ul>
                {panes.map((pane, key) =>
                    <div key={ key } id={`${TabsID}-${key}`}>
                        { pane }
                    </div>
                )}
            </div>
        );
    }
};

export const Pane = ({ children, title, icon }) => (
    <div className='col s12'>
        { children }
    </div>
);

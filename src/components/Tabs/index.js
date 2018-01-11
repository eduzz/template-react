import React, { Component } from 'react';
import jquery from 'jquery';
import { v4 } from 'uuid';
import Icon from 'components/Icon';
import styles from './styles.css';

export class Tabs extends Component {
    constructor() {
        super();

        this.id = v4();
    }

    componentDidMount() {
        jquery('#' + this.id).tabs();
    }

    render() {
        const panes = this.props.children.length ? [...this.props.children] : [{...this.props.children}];
        const TabsID = this.props.id || this.id;

        return (
            <div>
                <ul className={styles.component} id={this.id}>
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
    <div className="row">
        <div className='col s12'>
            { children }
        </div>
    </div>
);

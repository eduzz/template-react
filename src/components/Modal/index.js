import React, { Component } from 'react';
import jquery from 'jquery';

export class Modal extends Component {
    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        jquery('#' + this.props.id).modal({
            ready: () => {
                this.setState({
                    content: this.props.children.length ? [...this.props.children] : [{...this.props.children}]
                });
            },
            complete: () => {
                this.setState({
                    content: undefined
                });
            },
            ...this.props.options,
        });
    }

    render() {
        return (
            <div id={ this.props.id } className={`modal ${this.props.fixedFooter ? 'modal-fixed-footer' : ''} ${this.props.bottomSheet ? 'bottom-sheet' : ''}`}>
                { this.state.content }
            </div>
        );
    }
};

export const Content = ({ children }) => (
    <div className="modal-content">
        { children }
    </div>
);

export const Footer = ({ children }) => (
    <div className="modal-footer">
        { children }
    </div>
);

export const Button = ({ className, children, target }) => (
    <a className={ className } onClick={() => jquery(`#${target}`).modal('open')}>
        { children }
    </a>
);

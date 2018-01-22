import React, { Component } from 'react';
import jquery from 'jquery';
import { v4 } from 'uuid';

export default class Collapsible extends Component {
    constructor() {
        super();

        this.id = v4();
    }

    renderComponent() {
        jquery('#' + this.id).collapsible({
			...this.props.options,
		});
    }

	componentDidMount() {
		this.renderComponent();
	}

    componentDidUpdate() {
		this.renderComponent();
	}

	render() {
        this.id = this.props.id || this.id;

		return (
			<ul id={ this.id } className={`collapsible ${this.props.className}`} data-collapsible='accordion'>
				<li>
                    { this.props.children }
				</li>
			</ul>
		);
	}
}

export const Header = ({ children, className, active }) => (
	<div className={`collapsible-header ${className} ${active ? 'active' : ''}`}>
		{ children }
	</div>
);

export const Content = ({ children, className }) => (
	<div className={`collapsible-body ${className}`}>
		{ children }
	</div>
);

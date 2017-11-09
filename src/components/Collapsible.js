import React, { Component } from 'react';
import jquery from 'jquery';

export class Collapsible extends Component {
	componentDidMount() {
		jquery('#' + this.props.id).collapsible({
			...this.props.options,
		});
	}

	render() {
		return (
			<ul id={ this.props.id } className={`collapsible ${this.props.className}`} data-collapsible='accordion'>
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

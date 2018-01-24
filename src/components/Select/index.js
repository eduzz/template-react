import React, { Component } from 'react';
import { v4 } from 'uuid';
import jquery from 'jquery';

export default class Select extends Component {
    constructor() {
        super();

        this.id = v4();
    }

    renderComponent() {
        jquery('#' + this.id).material_select();
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
			<div className='input-field'>
				<select
                    id={this.id}
                    defaultValue={this.props.selected}
                >
                    {this.props.children}
				</select>
				<label>{this.props.floatlabel}</label>
			</div>
		);
	}
}

export const Option = (props) => (
    <option {...props}>{props.children}</option>
);

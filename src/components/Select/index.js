import React, { Component } from 'react';
import { v4 } from 'uuid';
import jquery from 'jquery';

export default class Select extends Component {
    constructor() {
        super();

        this.id = v4();
    }

    componentDidMount() {
        jquery('#' + this.id).material_select();
    }

	componentDidUpdate() {
        jquery('#' + this.id).material_select();
	}

	render() {
        this.id = this.props.id || this.id;

		return (
			<div className='input-field'>
				<select
                    id={this.id}
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

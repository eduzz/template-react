import React, { Component } from 'react';
import actions from 'actions';
import { SelectField, MenuItem } from 'material-ui';

class StateSelect extends Component {
    constructor() {
        super();

        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selected) {
            this.setState({
                value: nextProps.selected,
            });
        }
    }

    handleChange = (event, index, value) => {
        this.setState({
            value,
        });
    }

	render() {
		return (
            <SelectField
                defaultValue={this.props.selected}
                value={this.state.value}
                onChange={this.handleChange}
                style={{width: '100%'}}
                {...this.props}
            >
                <MenuItem value={2} primaryText="Publicado" />
                <MenuItem value={1} primaryText="Não Publicado" />
            </SelectField>
		);
	}
}

export default StateSelect;

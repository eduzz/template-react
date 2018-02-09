import React, { Component } from 'react';
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

	render() {
		return (
            <SelectField
                {...this.props}
                defaultValue={this.props.selected}
                value={this.state.value}
                style={{width: '100%'}}
            >
                <MenuItem value={2} primaryText="Publicado" />
                <MenuItem value={1} primaryText="Não Publicado" />
            </SelectField>
		);
	}
}

export default StateSelect;

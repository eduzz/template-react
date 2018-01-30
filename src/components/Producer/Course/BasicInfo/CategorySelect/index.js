import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import { SelectField, MenuItem } from 'material-ui';

class CategorySelect extends Component {
    constructor() {
        super();

        this.state = {};
    }

	componentDidMount() {
        this.props.getCategories();
	}

    componentWillReceiveProps(nextProps) {
        if(nextProps.selected.id) {
            this.setState({
                value: nextProps.selected.id,
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
			<div className='input-field'>
                <SelectField
                    floatingLabelText='Categoria'
                    defaultValue={this.props.selected.id}
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {this.props.categories.map(option =>
                        <MenuItem
                            key={option.id}
                            value={option.id}
                            primaryText={option.name}
                        />
                    )}
                </SelectField>
			</div>
		);
	}
}

const mapStateToProps = state => ({
    categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
    getCategories() {
        dispatch(actions.getCategories());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import { SelectField, MenuItem } from 'material-ui';
import Loading from 'components/Loading';

class CategorySelect extends Component {
    constructor() {
        super();

        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selected.id) {
            this.setState({
                value: nextProps.selected.id,
            });
        }
    }

    componentWillUnmount() {
        this.props.cleanCategories();
    }

    handleChange = (event, index, value) => {
        this.setState({
            value,
        });
    }

    handleClick = () => {
        this.props.getCategories(this.props.categories);
    }

	render() {
		return (
			<div className='input-field'>
                <SelectField
                    floatingLabelText='Categoria'
                    defaultValue={this.props.selected.id}
                    value={this.state.value}
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                    style={{width: '100%'}}
                >
                    {this.props.selected.id ? <MenuItem
                        key={this.props.selected.id}
                        value={this.props.selected.id}
                        primaryText={this.props.selected.name}
                    /> : ''}

                    <Loading active={!this.props.categories.length} />

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
    getCategories(categories) {
        if(!categories.length) {
            dispatch(actions.getCategories());
        }
    },
    cleanCategories() {
        dispatch(actions.cleanCategories());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);

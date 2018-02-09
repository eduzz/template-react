import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import { SelectField, MenuItem } from 'material-ui';
import Loading from 'components/Loading';

class CategorySelect extends Component {
    componentDidMount() {
        this.props.getCategories(this.props.categories);
    }

    componentWillUnmount() {
        this.props.cleanCategories();
    }

	render() {
		return (
			<div className='input-field'>
                <SelectField
                    {...this.props}
                    floatingLabelText='Categoria'
                    style={{width: '100%'}}
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
    getCategories(categories) {
        dispatch(actions.getCategories());
    },
    cleanCategories() {
        dispatch(actions.cleanCategories());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);

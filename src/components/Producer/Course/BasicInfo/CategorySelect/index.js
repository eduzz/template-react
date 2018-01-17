import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import Select, { Option } from 'components/Select';

class CategorySelect extends Component {

	componentDidMount() {
        this.props.getCategories();
	}

	render() {
		return (
			<div className='input-field'>
				<Select floatlabel='Categoria'>
                    {this.props.categories.map(option =>
                        <Option key={option.id} value={option.id}>
                            {option.name}
                        </Option>
                    )}
                </Select>
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

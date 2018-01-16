import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import Select, { Option } from 'components/Select';

class AuthorSelect extends Component {

	componentDidMount() {
        this.props.getAuthors();
	}

	render() {
		return (
			<div className='input-field'>
                <Select floatlabel='Autores'>
                    {this.props.authors.map(author =>
                        <Option key={author.aut_cod} value={author.aut_cod}>
                            {author.aut_name}
                        </Option>
                    )}
                </Select>
			</div>
		);
	}
}

const mapStateToProps = state => ({
    authors: state.authors,
});

const mapDispatchToProps = dispatch => ({
    getAuthors() {
        dispatch(actions.getAuthors());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSelect);

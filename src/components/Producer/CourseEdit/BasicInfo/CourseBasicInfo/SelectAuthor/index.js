import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SelectField, MenuItem } from 'material-ui';
import actions from 'actions';

class SelectAuthor extends Component {
    componentDidMount() {
        this.props.getAuthors();
    }

    render() {
        return (
            <SelectField>
                {this.props.authors.map((author, key) =>
                    <MenuItem key={ key } value={ author.value } />
                )}
            </SelectField>
        );
    }
}

const mapStateToProps = state => ({
    authors: state.authors,
});

const mapDispatchToProps = dispatch => ({
    getAuthors: () => dispatch(actions.getAuthors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectAuthor);

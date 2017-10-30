import React, { Component } from 'react';
import CardList from './CardList';
import { connect } from 'react-redux';
import { getCourses } from '../../actions';

class VisibleCardList extends Component {
	componentDidMount() {
        this.props.dispatch(getCourses());
    }

	render() {
		return <CardList courses={ this.props.courses } />;
	}
}

const mapStateToProps = state => ({
	courses: state.courses,
});

export default connect(mapStateToProps)(VisibleCardList);
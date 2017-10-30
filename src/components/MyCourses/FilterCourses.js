import React from 'react';
import { connect } from 'react-redux';
import Search from '../Search';

const mapStateToProps = state => ({
	searchFilter: state.searchFilter,
});

export default connect(mapStateToProps)(Search);
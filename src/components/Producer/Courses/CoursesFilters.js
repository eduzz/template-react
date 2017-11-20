import React, { Component } from 'react';
import Icon from './Icon';
import { FiltersMenu, ProducerFilter, PeriodFilter, StatusFilter, CategoryFilter, TagsFilter } from './Filters';

class CoursesFilters extends Component {
	constructor() {
		super();

		this.state = {
			isActive: false,
		};
	}

	render() {
		return (
			<div>
				<FiltersMenu active={ this.state.isActive } 
					closeMenu={ () => 
					this.setState({
						isActive: false,
					}) 
				}>
				    <ProducerFilter active />
				    <PeriodFilter />
				    <StatusFilter active />
				    <CategoryFilter />
				    <TagsFilter />
				</FiltersMenu>

				<a className="button waves-light waves-effect" onClick={ () =>
					this.setState({
						isActive: true,
					})
				}>
		            <Icon name='package' />
		            <span>Filtros</span>
		        </a>
			</div>
		);
	}
};

export default CoursesFilters;
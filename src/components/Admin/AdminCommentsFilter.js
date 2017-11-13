import React, { Component } from 'react';
import Icon from '../Icon';
import { FiltersMenu, CourseFilter, CommentStatusFilter, PeriodFilter,StudentFilter, CommentContentFilter, CommentFavoriteFilter } from '../Filters';

export default class AdminCommentsFilter extends Component { 
  constructor(){
    super();   
	this.state = {isActive: false,}; 
  }
  render(){
  	return (
		<div>
			<FiltersMenu active={this.state.isActive} closeMenu={ () => this.setState({isActive: false}) }>
				<CourseFilter />
			    <CommentStatusFilter />
			    <CommentContentFilter />
			    <StudentFilter />
			    <PeriodFilter />
		        <CommentFavoriteFilter />
			</FiltersMenu>

			<a className="button waves-light waves-effect" onClick={ () => this.setState({ isActive: !this.state.isActive })}>
	            <Icon name='package' />
	            <span>Filtros</span>
	        </a>
		</div>  		
  	)
  }
}
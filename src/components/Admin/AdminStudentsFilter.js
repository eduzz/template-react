import React, { Component } from 'react';
import Icon from '../Icon';
import { FiltersMenu, CourseFilter, TrackFilter, PeriodFilter,StudentFilter, StudentLastAcessFilter,StudentStatusFilter  } from '../Filters';

export default class AdminStudentsFilter extends Component { 
  constructor(){
    super();   
	this.state = {isActive: false,}; 
  }
  render(){
  	return (
		<div className="row">
			<FiltersMenu active={this.state.isActive} closeMenu={ () => this.setState({isActive: false}) }>
				<CourseFilter />
			    <TrackFilter />
			    <PeriodFilter title="Data da Matrícula" />
			    <StudentLastAcessFilter />
			    <StudentStatusFilter />
			    <StudentFilter />
			</FiltersMenu>

			<a className="button waves-light waves-effect" onClick={ () => this.setState({ isActive: !this.state.isActive })}>
	            <Icon name='package' />
	            <span>Filtros</span>
	        </a>
		</div>  		
  	)
  }
}
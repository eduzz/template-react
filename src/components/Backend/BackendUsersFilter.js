import React, { Component } from 'react';
import Icon from '../Icon';
import { FiltersMenu, EmailFilter, NameFilter } from '../Filters';

export default class BackendUsersFilter extends Component { 
  constructor(){
    super();   
	this.state = {isActive: false}; 
  }
  render(){
  	return (
		<div className="row">
			<FiltersMenu active={this.state.isActive} closeMenu={ () => this.setState({isActive: false}) }>
			    <NameFilter active={true} />
			    <EmailFilter active={true} />
			</FiltersMenu>

			<a className="button waves-light waves-effect" onClick={ () => this.setState({ isActive: !this.state.isActive })}>
	            <Icon name='package' />
	            <span>Filtros</span>
	        </a>
		</div>  		
  	)
  }
}
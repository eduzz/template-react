import React, { Component } from 'react';
export default class SwitchWithInput extends Component{
	constructor(){
		super();
		this.state = {active:false};
	}

	render(){
		return(
			<div className={this.props.classParent}>
				<div className="row">
					<div className="col m12 s12">
						<div className="form-block">
							<div className="switch">
								<label>
									<input type="checkbox" id={this.props.id} onChange={(event)=>{ this.setState({active:!this.state.active}) }} />
									<span className="lever"></span>
								</label>
								<label htmlFor={this.props.id}>
									<h3 className="form-block-title">{this.props.title}</h3>
								</label>
							</div>
						</div>
					</div>
				</div>
				{
					!this.state.active ? null : 
					<div className="row">
						<div className="col m12 s12">
						 	<input type="text" className="validate" placeholder={this.props.placeholder} />
						</div>
					</div>
				}
			</div>			
		)
	}
}
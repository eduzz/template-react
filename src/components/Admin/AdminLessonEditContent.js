import React, { Component } from 'react';
import TextEditor from '../TextEditor';
export default class AdminLessonEditContent extends Component{
	constructor(){
		super();
		this.state = {activeContentType:'content-type-1'};
		this.handlerChange = this.handlerChange.bind(this);
	}
	
	handlerChange(e){
		this.setState({activeContentType: e.target.id})
	}
  	
  	render(){
    	return (
			<section className="form-section">
				<h3 className="form-block-title">Conteúdo</h3>
			  	<div className="row">
			    	<div className="col m2 l2">
				        <input type="radio" checked={this.state.activeContentType ===  'content-type-1' ? true : false} className="with-gap" id="content-type-1" name="content-type" onChange={(event)=>{ this.handlerChange(event) }} />
				        <label htmlFor="content-type-1"> <span className="radio-title">Descrição</span></label>
			  		</div>
			    	<div className="col m2 l2">
				        <input type="radio" checked={this.state.activeContentType ===  'content-type-2' ? true : false} className="with-gap" id="content-type-2" name="content-type" onChange={(event)=>{ this.handlerChange(event) }} />
				        <label htmlFor="content-type-2"> <span className="radio-title">Iframe</span></label>
			  		</div>
			  	</div>

			  	<div className="row">
			  		<div className="col m12 l12">
	  					{ 
	  						this.state.activeContentType !==  'content-type-1' ? null : 
            				<div className="form-block">
	  							<TextEditor />
	  						</div>
	  					}
						{ 
							this.state.activeContentType !==  'content-type-2' ? null : 
							<div className="form-block">
								<div className="row">
		    						<div className="col m12 l12">
										<h3 className="form-block-title">Link do Iframe (necessário uso do https)</h3>
										<input type="text" className="validate" placeholder="Ex: https://www.exemplo.com.br" /> 
		    						</div>
		    					</div>
		    					<div className="row">
		    						<div className="col m12 l12">
										<h3 className="form-block-title">Altura do Iframe (px)</h3>
										<input type="text" className="validate" placeholder="Ex: 250" /> 
		    						</div>
		    					</div>
							</div>
						}
			  		</div>
			  	</div>
			</section>
		)
	}
}
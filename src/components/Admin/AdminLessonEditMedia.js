import React, { Component } from 'react';
import TextEditor from '../TextEditor';
export default class AdminLessonEditMedia extends Component{
	constructor(){
		super();
		this.state = {activeMediaType:'media-type-1'};
		this.handlerChange = this.handlerChange.bind(this);
	}
	
	handlerChange(e){
		this.setState({activeMediaType: e.target.id})
	}
  	
  	render(){
    	return (
			<section className="form-section">
				<h3 className="form-block-title">Mídia</h3>
			  	<div className="row">
			    	<div className="col m2 l2">
				        <input type="radio" checked={this.state.activeMediaType ===  'media-type-1' ? true : false} className="with-gap" id="media-type-1" name="media-type" onChange={(event)=>{ this.handlerChange(event) }} />
				        <label htmlFor="media-type-1"> <span className="radio-title">Vídeo</span></label>
			  		</div>
			    	<div className="col m2 l2">
				        <input type="radio" checked={this.state.activeMediaType ===  'media-type-2' ? true : false} className="with-gap" id="media-type-2" name="media-type" onChange={(event)=>{ this.handlerChange(event) }} />
				        <label htmlFor="media-type-2"> <span className="radio-title">Texto</span></label>
			  		</div>
			    	<div className="col m2 l2">
				        <input type="radio" checked={this.state.activeMediaType ===  'media-type-3' ? true : false} className="with-gap" id="media-type-3" name="media-type" onChange={(event)=>{ this.handlerChange(event) }} />
				        <label htmlFor="media-type-3"> <span className="radio-title">Áudio</span></label>
			  		</div>					  							  		
			  	</div>

			  	<div className="row">
			  		<div className="col m12 l12">
                		<div className="form-block">
		  					{ this.state.activeMediaType !==  'media-type-1' ? null : <input type="text" className="validate" placeholder="Cole uma URL ou EMBED aqui" /> }
							{ this.state.activeMediaType !==  'media-type-2' ? null : <TextEditor /> }
				          	{ this.state.activeMediaType !==  'media-type-3' ? null : <a className='button small darkest-color waves-effect waves-light'><span>Enviar Arquivo</span></a> }
						</div>
			  		</div>
			  	</div>
			</section>
		)
	}
}
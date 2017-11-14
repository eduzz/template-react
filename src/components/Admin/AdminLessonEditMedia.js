import React, { Component } from 'react';
import jquery from 'jquery';

export default class AdminLessonEditMedia extends Component{
	componentDidMount(){
		jquery('#AdminLessonEditMedia').material_select();  
	}
  	render(){
    	return (
	        <div className="row">
	            <div className="col m12 l12">
	                <div className="form-block">
	                    <h3 className="form-block-title">Tipo de Mídia</h3>
	                      <select id="AdminLessonEditMedia">
	                            <option value="1" key="1">Youtube/Vimeo</option>
	                            <option value="2" key="2">Embed</option>
	                            <option value="3" key="3">Texto</option>
	                            <option value="4" key="4">Áudio</option>
	                      </select> 
	                </div>
	            </div>                              
	            <div className="col m12 s12">
	                <div className="form-block" id="lessonMediaType1">
	                    <h3 className="form-block-title">Video Aula</h3>
	                    <p className="date-description">Url do vídeo, ex: youtube.com/37e7e7 ou vimeo.com/87373</p>
	                    <input type="text" className="validate"/>
	                </div>
	                <div className="form-block" id="lessonMediaType2">
	                    <h3 className="form-block-title">Embed</h3>
	                    <p className="date-description">Copie e Cole aqui o código EMBED do vídeo</p>
	                   <textarea className="materialize-textarea validate" />
	                </div>
	                <div className="form-block" id="lessonMediaType3">
	                    <h3 className="form-block-title">Texto</h3>
	                   <textarea className="materialize-textarea validate" />
	                </div>
	                <div className="form-block" id="lessonMediaType4">
	                    <h3 className="form-block-title">Áudio</h3>
	                     <a className='button small darkest-color waves-effect waves-light'>
	                      <span>Enviar Arquivo</span>
	                    </a>
	                </div>
	            </div>
	        </div>   
		)
	}
}
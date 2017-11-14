import React, { Component } from 'react';
import { Modal, Content, Footer } from '../Modal';

export default class AdminLessonImportModal extends Component{
	constructor(){
		super();
		this.state = {listLessonImports:[]};
	}
	componentDidMount(){
		// #dev No redux conectar na API e obter a lista de Aulas de todos os cursos dele
		this.setState({listLessonImports:     [{ "LessonId":1, "LessonName": "Aula 1", "ModuleName": "Módulo Teste 1", "CourseName": "Curso Teste" }, { "LessonId":2, "LessonName": "Aula 2", "ModuleName": "Módulo Teste 2 ", "CourseName": "Curso ABC"},{ "LessonId":3, "LessonName": "Aula 1", "ModuleName": "Módulo Teste ", "CourseName": "Curso Teste 2"},{ "LessonId":4, "LessonName": "Aula 4", "ModuleName": "Módulo Teste 2 ", "CourseName": "Curso Teste 3"}]      });  
	}

  	render(){
	    return (
			<Modal id='modal-lesson-import' fixedFooter>
	            <Content>
				    <div className="container">
						<section className="form-section">
			                <h3 className="form-section-title">Aulas Cadastradas</h3>
			                <div className="row">
			                	<div className="col m12 s12">
									<div className="form-block">
			                        	<h3 className="form-block-title">Buscar</h3>
			                        	<input id="Search" type="text" className="validate" />
			                      	</div>
			                	</div>
			                </div>
			                <div className="row">
			                    <div className="col m12 s12">
			                        <div className="form-block">
			                            <table className="striped">
			                                <thead>
			                                    <tr>
			                                        <th>Aula</th>
			                                        <th>Módulo</th>
			                                        <th>Curso</th>
			                                        <th></th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                {
			                                    this.state.listLessonImports.map((item, i) => {
			                                        return (
			                                            <tr key={i}>
			                                                <td>{
			                                                  item.LessonName /* #dev Alterar pro nome amigavel */
			                                                }</td>
			                                                <td>{
			                                                  item.ModuleName /* #dev Alterar pro nome amigavel */
			                                                }</td>
			                                                <td>{
			                                                  item.CourseName /* #dev Alterar pro nome amigavel */
			                                                }</td>
			                                                <td>
			                                                    <a className='button small affirmative waves-effect waves-light' 
			                                                       onClick={()=>{this.props.onClick(item)}}>
			                                                        <span>Importar</span>
			                                                    </a>
			                                                </td>
			                                            </tr>
			                                        )
			                                    })
			                                }
			                                </tbody>
			                            </table> 
			                        </div>
			                    </div>
			                </div>
			            </section>			    
				    </div>
				</Content>
		    	<Footer>
		        	<a className="modal-action modal-close waves-effect waves-red btn-flat">Fechar</a>
		    	</Footer>
			</Modal>    
	    )
  }
}
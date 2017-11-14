import React, { Component } from 'react';
import { Modal, Content, Footer } from '../Modal';
export default class AdminModuleImportModal extends Component{
  constructor(){
    super();
    this.state = {listModules:[]};  	
  }
  componentDidMount(){
	  	var listData = [{"moduleId":1,"moduleName": "Módulo 1","courseName": "Curso Teste"},{"moduleId":2,"moduleName": "Módulo 2","courseName": "Curso ABC"},{"moduleId":3,"moduleName": "Módulo 3","courseName": "Curso Teste 2"},{"moduleId":4,"moduleName": "Módulo 4","courseName": "Curso Teste 3"}];
		this.setState({listModules: listData}); // #dev No Redux Acessar a API e obter a lista de módulos dos cursos dele
  }
  render(){
    return (
	<Modal id='modal-importmodules' fixedFooter>
	    <Content>
	        <div className="container">
		        <div className="container">
		            <section className="form-section">
		                <h3 className="form-section-title">Módulos Cadastrados</h3>
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
		                                        <th>Módulo</th>
		                                        <th>Curso</th>
		                                        <th></th>
		                                    </tr>
		                                </thead>
		                                <tbody> { this.state.listModules.map((item, i) => {
		                                        	return (
			                                            <tr key={i}>
			                                                <td>{ item.moduleName /* #dev Alterar pro nome amigavel */ }</td>
			                                                <td>{ item.courseName /* #dev Alterar pro nome amigavel */ }</td>
			                                                <td><a className='button small affirmative waves-effect waves-light'><span>Importar</span></a></td>
			                                            </tr>
		                                        	)
		                                    	})}
		                                </tbody>
		                            </table> 
		                        </div>
		                    </div>
		                </div>
		            </section>
			    </div>
		    </div>
	    </Content>
	    <Footer>
	    	<a className="modal-action modal-close waves-effect waves-red btn-flat">Fechar</a>
	    </Footer>
	</Modal>
    )
  }
}
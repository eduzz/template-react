import React, { Component } from 'react';

export default class AuthorsTable extends Component {
  constructor(){
    super();
    this.state = {listAuthors:[]};  	
  }
  componentDidMount()
  {
      var list = {data: [ { Id: 2093, Name: "Prof. Robson Freitas", Description:"Professor de Engenharia de Software" }, { Id: 492, Name: "Heloise Silva",Description:"Professora de Biologia" } ]};
      this.setState({listAuthors:list.data});
      // #dev Obter de http://nutror.devzz.ninja/authors  
  }
  render()
  {
    return (
      <section className="form-section">
          <h3 className="form-section-title">Autores cadastrados</h3>
          <div className="row">
              <div className="col m12 s12">
                  <div className="form-block">
                      <table className="striped">
                          <thead>
                              <tr>
                                  <th>Nome</th>
                                  <th>Resumo</th>
                                  <th> </th>
                              </tr>
                          </thead>
                          <tbody>
                          {
                              this.state.listAuthors.map((item, i) => {
                                return (
                                  <tr key={i}>
                                      <td>{ item.Name /* #dev Alterar pro nome amigavel */ }</td>
                                      <td>{ item.Description /* #dev Alterar pro nome amigavel */ }</td>
                                      <td><a className='button small affirmative waves-effect waves-light'  onClick={()=>{this.props.onClick(item)}}><span>Editar</span></a></td>
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
		)
	}
}
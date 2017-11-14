import React, { Component } from 'react';
import jquery from 'jquery';

export default class AuthorSelect extends Component {
  constructor(){
    super();
    this.state = {listAuthors:[]};    
  }
  componentDidMount()
  {
    // #dev Obter de http://nutror.devzz.ninja/authors 
        var list = {data: [ { Id: 2093, Name: "Prof. Robson Freitas", Description:"Professor de Engenharia de Software" }, { Id: 492, Name: "Heloise Silva",Description:"Professora de Biologia" } ]};
        this.setState({listAuthors:list.data});   
  }
  render()
  {
    jquery('#AuthorSelect').material_select();  
    
    return (
        <div className="form-block">
          <select id="AuthorSelect">
              {
                this.state.listAuthors.map((item, i) => {
                  return (
                    <option  value={ item.Id /* #dev Alterar pro nome amigavel */ } key={i} >
                      { item.Name /* #dev Alterar pro nome amigavel */ } 
                    </option>
                  )
                })
              }
          </select> 
        </div>
    )
  }
}
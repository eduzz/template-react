import React, { Component } from 'react';
import Icon from '../Icon';
import {Button } from '../Modal';

export default class AuthorEdit extends Component {
  submitForm()
  {
    var dataSend = {
        "Author":  {
            "Name": this.props.Name, "Description": this.props.Description, "ImgAvatar": "", "UserCod": "151",
        }
    };
    console.log('Salvando Alterações no Autor ...');
    console.log(dataSend);
    
    // #dev Enviar o Post para http://nutror.devzz.ninja/authors

  }
  render(){
    return (
        <section className="form-section">
            <h3 className="form-section-title">Cadastro de Autor</h3>
            <div className="row">
                <div className="col m4 s4">
                  <div className="form-block">
                    <h3 className="form-block-title">Imagem do Autor</h3>
                    <p className="input-description">Essa foto será utilizada na miniatura do Autor do Curso</p>
                    <a className="input-img card-img">
                      <Icon name='paper' />
                      <span>Alterar Imagem</span>
                    </a>
                  </div>                  
                </div>
                <div className="col m8 s8">
                  <div className="col m12 s12">
                      <div className="form-block">
                          <h3 className="form-block-title">Nome</h3>
                          <p className="date-description">Nome ou Apelido do Autor </p>
                          <input id="Name" type="text" className="validate" value={this.props.Name}/>
                      </div>
                  </div>
                  <div className="col m12 s12">
                      <div className="form-block">
                          <h3 className="form-block-title">Resumo do Autor</h3>
                          <p className="date-description">Informe um Resumo ou Biografia do Autor </p>
                          <textarea id="Description" className="materialize-textarea validate" value={this.props.Description} />
                      </div>
                  </div>
                </div>

            </div>
            <div className="row">
              <div className="col m12 s12">
                  <div className="form-block">
                      <Button className='button affirmative waves-effect waves-light' onClick={ () =>{this.submitForm()}}>
                        <span>Salvar Alterações</span>
                      </Button>
                  </div>
              </div>            
            </div>
        </section>

    )
  }
}
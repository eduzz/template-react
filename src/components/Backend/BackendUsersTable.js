import React, { Component } from 'react';
import { Button } from '../Modal';
import BackendUsersChangePasswordModal from './BackendUsersChangePasswordModal';

export default class BackendUsersTable extends Component {
  constructor(){
    super(); 
    this.state = {listUsers:[]};      
  }
  componentDidMount()
  {
  	// #dev alimentar a variável abaixo no Redux fazendo chamada a API
  	var list = {data: [ { id: "49568", name: "João Maria Rocha", email:"email1@teste.com"},{ id: "12359", name: "Robenilson Clodoaldo", email:"email2@teste.com"},{ id: "3217", name: "Jucimara da Silva", email:"email3@teste.com"}]};
  	this.setState({listUsers:list.data}); 
  }
  render()
  {
    return(
        <div className="row">
			<BackendUsersChangePasswordModal id='modal-change-password' />
            <div className="col m12 s12">
                <div className="form-block">
                    <table className="striped">
                        <thead>
                            <tr>
                                <th>Código no Nutror</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Aluno</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.listUsers.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.email}
                                        </td>
                                        <td>
                                            <Button className='button small affirmative waves-effect waves-light'  target='modal-change-password'>
                                                <span>Alterar Senha</span>
                                            </Button>
                                            <a className='button small affirmative waves-effect waves-light'>
                                                <span>Conectar</span>
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
    )
  }
}
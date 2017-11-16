import React, { Component } from 'react';
import { Button } from '../Modal';
import AdminStudentsFilter from './AdminStudentsFilter';
import AdminStudentsExtendAcessModal from './AdminStudentsExtendAcessModal';
import AdminStudentsLinkDirectAcessModal from './AdminStudentsLinkDirectAcessModal';
import AdminStudentsChangePasswordModal from './AdminStudentsChangePasswordModal';

export default class AdminStudentsTable extends Component {
  constructor(){
    super(); 
    this.state = {listStudents:[]};      
  }
  componentDidMount()
  {
  	// #dev Endpoint Não está funcionando, cobrar a correção (http://nutror.devzz.ninja/adm/students)
  }
  render()
  {
    return(

        <div className="container">

            <AdminStudentsExtendAcessModal id="modal-extend-access" />
            <AdminStudentsLinkDirectAcessModal id="modal-link-direct-acess" />
            <AdminStudentsChangePasswordModal id="modal-change-password" />

            <div className="row">
                <div className="col m3 s12">
                    <AdminStudentsFilter />
                </div>
                <div className="col m3 s12">
                    <Button className='button small darkest-color waves-effect waves-light' title="Exporta os resultados para CSV"><span>Exportar Resultados</span></Button><br />
                </div>
                <div className="col m5 s12">
                    <div className="switch">
                        <label>
                            <input type="checkbox" id="check-showPercentWatch"/>
                            <span className="lever"></span>
                        </label>
                        <label htmlFor="check-showPercentWatch">
                            <p className="check-description">Exibir Coluna Porcentagem Assistida</p>
                        </label>
                    </div>
                </div>
            </div>
			<div className="row">
                <div className="col m12 s12">
                    <div className="form-block">
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="form-block">
                                            <input type="checkbox" className="filled-in" id="filled-in-box0" name="ckbSelectStudent" />
                                            <label for="filled-in-box0"></label>
                                        </div>
                                    </th>
                                    <th>Aluno</th>
                                    <th>Último Acesso</th>
                                    <th>Conteúdo</th>
                                    <th>Matrículado em</th>
                                    <th>Situação da Matrícula</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>
                                        <div className="form-block">
                                            <input type="checkbox" className="filled-in" id="filled-in-box1" name="ckbSelectStudent" />
                                            <label for="filled-in-box1"></label>
                                        </div>
                                    </td>
                                    <td>José da Silva Alves<br />josedasilvaalves@gmail.com</td>
                                    <td>Há 22 horas</td>
                                    <td>Curso Como treinar seu Cão</td>
                                    <td>13/07/2017</td>
                                    <td>Ativo</td>
                                    <td>
                                        <Button className='button small darkest-color waves-effect waves-light'>
                                            <span>Enviar Link para Redefinição de Senha</span>
                                        </Button><br />
                                        <Button className='button small affirmative waves-effect waves-light' target="modal-link-direct-acess">
                                            <span>Link de Acesso direto</span>
                                        </Button><br />
                                        <Button className='button small affirmative waves-effect waves-light'  target='modal-change-password'>
                                            <span>Trocar Senha</span>
                                        </Button><br />

                                        <Button className='button small darkest-color waves-effect waves-light'>
                                            <span>Desativar Acesso</span>
                                        </Button><br />

                                        <Button className='button small darkest-color waves-effect waves-light'>
                                            <span>Ativar Acesso</span>
                                        </Button><br />

                                        <Button className='button small darkest-color waves-effect waves-light'>
                                            <span>Excluir Matrícula</span>
                                        </Button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="form-block">
                                            <input type="checkbox" className="filled-in" id="filled-in-box2" name="ckbSelectStudent" />
                                            <label for="filled-in-box2"></label>
                                        </div>
                                    </td>
                                    <td>Maria Soares Neto<br />marianetosoares@hotmail.com</td>
                                    <td>Há 22 horas</td>
                                    <td>Curso Aprenda a Fazer Cookies Gostosos e Crocantes para Vender</td>
                                    <td>20/03/2015</td>
                                    <td>
                                        Vencido<br />
                                        <Button className='button small affirmative waves-effect waves-light' target="modal-extend-access">
                                            <span>Conceder mais dias de acesso a este aluno</span>
                                        </Button>
                                    </td>
                                    <td>
                                        <Button className='button small darkest-color waves-effect waves-light'>
                                            <span>Enviar Link para Redefinição de Senha</span>
                                        </Button><br />
                                        <Button className='button small affirmative waves-effect waves-light' target="modal-link-direct-acess">
                                            <span>Link de Acesso direto</span>
                                        </Button><br />
                                        <Button className='button small affirmative waves-effect waves-light'  target='modal-change-password'>
                                            <span>Trocar Senha</span>
                                        </Button><br />

                                        <Button className='button small darkest-color waves-effect waves-light'>
                                            <span>Desativar Acesso</span>
                                        </Button><br />

                                        <Button className='button small darkest-color waves-effect waves-light'>
                                            <span>Ativar Acesso</span>
                                        </Button><br />

                                        <Button className='button small darkest-color waves-effect waves-light'>
                                            <span>Excluir Matrícula</span>
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
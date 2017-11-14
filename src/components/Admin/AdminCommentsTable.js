import React, { Component } from 'react';
import { Button } from '../Modal';

export default class AdminCommentsTable extends Component {
  constructor(){
    super(); 
    this.state = {listComments:[]};      
  }
  componentDidMount()
  {
  	// #dev alimentar a variável abaixo no Redux fazendo chamada a API
  	var list = {data: [ { id: "49568", parentId: null, createdAt: "2017-07-04 16:40:53.000", updatedAt: "2017-11-13 11:44:17.607", status: 0, isFavorite: 1, text: "Teste comentário helo", qtd_replies: 1, user: { name: "AdmNutror", email: "admnutror@gmail.com" }, author: { name: null, imgAvatar: null }, course: { title: "A Melhor Pipoca do Mundo", id: 3286 }, module: { title: "teste", id: 75778 }, lesson: { title: "teste", id: 75779 } }, { id: 48484, parentId: null, createdAt: "2017-06-30 14:44:57.000", updatedAt: "2017-11-13 11:44:17.607", status: 0, isFavorite: 0, text: "Otimo Curso", qtd_replies: 1, user: { name: "AdmNutror", email: "admnutror@gmail.com" }, author: { name: null, imgAvatar: null }, course: { title: "curso 3", id: 144 }, module: { title: "Modulo 2", id: 235 }, lesson: { title: "teste aula 2", id: 236 } }, { id: 48482, parentId: null, createdAt: "2017-06-30 14:42:10.000", updatedAt: "2017-11-13 11:44:17.607", status: 0, isFavorite: 0, text: "Otimo curso", qtd_replies: 0, user: { name: "AdmNutror", email: "admnutror@gmail.com" }, author: { name: null, imgAvatar: null }, course: { title: "curso 3", id: 144 }, module: { title: "Modulo 2", id: 235 }, lesson: { title: "teste aula 2", id: 236 } } ]};
  	this.setState({listComments:list.data}); 
  }
  render()
  {
    return(
        <div className="row">
            <div className="col m12 s12">
                <div className="form-block">
                    <table className="striped">
                        <thead>
                            <tr>
                                <th>Favorito</th>
                                <th>Criação</th>
                                <th>Aluno</th>
                                <th>Curso/Módulo/Conteúdo</th>
                                <th>Respostas</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.listComments.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.isFavorite}</td>
                                        <td>{item.createdAt}</td>
                                        <td>
                                            {item.user.name}
                                            <br />
                                            {item.user.email}
                                        </td>
                                        <td>
                                            {item.course.title} >
                                            {item.module.title} >
                                            {item.lesson.title}
                                        </td>
                                        <td>{item.qtd_replies}</td>
                                        <td>{item.status}</td>

                                        <td>
                                            <Button className='button small affirmative waves-effect waves-light'  target='modal-answer'>
                                                <span>Responder</span>
                                            </Button>
                                            <Button className='button small darkest-color waves-effect waves-light' 
                                               onClick={()=>{this.props.onClick(item)}}>
                                                <span>Aprovar</span>
                                            </Button>
                                            <Button className='button small darkest-color waves-effect waves-light' 
                                               onClick={()=>{this.props.onClick(item)}}>
                                                <span>Reprovar</span>
                                            </Button>
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
import React, { Component } from 'react';
import jquery from 'jquery';
import Author from './Author';
import { Modal, Content, Footer, Button } from '../Modal';

export default class AuthorSelect extends Component {
    constructor(){
        super();
        // #dev Obter de http://nutror.devzz.ninja/authors 
        this.state = {listAuthors:[ { Id: 2093, Name: "Prof. Robson Freitas", Description:"Professor de Engenharia de Software" }, { Id: 492, Name: "Heloise Silva",Description:"Professora de Biologia" } ]};    
    }
    componentDidMount()
    {
        jquery('#'+ this.props.id).material_select();        
    }
    render()
    {
    
        jquery('#'+ this.props.id).material_select();  
    
        return (
            <div className="form-block">
                <Modal id={'modal-'+this.props.id} fixedFooter>
                    <Content>
                        <Author />
                    </Content>
                    <Footer>
                        <a className="modal-action modal-close waves-effect waves-green btn-flat">Salvar</a>
                        <a className="modal-action modal-close waves-effect waves-red btn-flat">Cancelar</a>
                    </Footer>
                </Modal>
                <select id={this.props.id}>
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
                <Button className='button affirmative waves-effect waves-light' target={'modal-'+this.props.id}>
                    <span>Editar Autor</span>
                </Button>
            </div>
        )
    }
}
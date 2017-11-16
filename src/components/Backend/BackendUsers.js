import React, { Component } from 'react';
import BackendUsersTable from './BackendUsersTable';
import BackendUsersFilter from './BackendUsersFilter';

export default class BackendUsers extends Component
{
    render()
    {
        return (
            <section className="page-content">
                <div className="container">
                    <section className="page-header">
                        <div className="container">
                            <div className="page-header-content">
                                <h2 className="page-title">Produtores e Alunos</h2>
                                <p className="page-subtitle">Busque e gerencie usuários do sistema</p>
                            </div>
                        </div>
                    </section>
                    <div className="container">
                        <BackendUsersFilter />
                        <BackendUsersTable />
                    </div>
                </div>
            </section>
        )
    }        
}
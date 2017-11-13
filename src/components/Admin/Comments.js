import React, { Component } from 'react';
import AdminCommentsTable from './AdminCommentsTable';

export default class AdminComments extends Component
{
    render()
    {
        return (
            <section className="page-content">
                <div className="container">
                    <section className="page-header">
                        <div className="container">
                            <div className="page-header-content">
                                <h2 className="page-title">Moderar Comentários</h2>
                                <p className="page-subtitle">Modere os comentários de todos os seus Cursos</p>
                            </div>
                        </div>
                    </section>
                    <div className="container">
                        <AdminCommentsTable />
                    </div>
                </div>
            </section>
        )
    }        
}
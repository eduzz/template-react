import React from 'react';
import Icon from '../Icon';

const PageHeader = () => (
    <section className="page-header">
        <div className="container">
            <div className="page-header-content">
                <h2 className="page-title">Meus Cursos</h2>
                <p className="page-subtitle">Gerencie seus cursos</p>
            </div>
            <div className="page-header-action">
                <a className="button affirmative">
                    <Icon name='paper' />
                    <span>Novo Curso</span>
                </a>
            </div>
        </div>
    </section>
);

export default PageHeader;

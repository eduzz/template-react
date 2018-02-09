import React from 'react';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';
import styles from './styles.css';

const PageHeader = () => (
    <section className={styles.component}>

        <div className="container">
            <div className="page-header-content">
                <div className="page-title-icon">
                    <Icon name='play-outline' />
                </div>
                <div>
                    <h2 className="page-title">Meus Cursos</h2>
                    <p className="page-subtitle">Gerencie os cursos que você criou</p>
                </div>
            </div>
            <div className="page-header-action">
                <Link to='courses/new' className="button affirmative waves-light waves-effect">
                    <Icon name='package' />
                    <span>Novo Curso</span>
                </Link>
            </div>
        </div>
    </section>
);

export default PageHeader;

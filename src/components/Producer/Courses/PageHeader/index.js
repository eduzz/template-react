import React from 'react';
import Icon from 'components/Icon';
import styles from './styles.css';

const PageHeader = () => (
    <section className={styles.component}>

        <div className="container">
            <div className="page-header-content">
                <div class="page-title-icon">
                    <Icon name='play-outline' />
                </div>
                <div>
                    <h2 className="page-title">Meus Cursos</h2>
                    <p className="page-subtitle">Gerencie os cursos que você criou</p>
                </div>
            </div>
            <div className="page-header-action">
                <a className="button affirmative waves-light waves-effect">
                    <Icon name='package' />
                    <span>Novo Curso</span>
                </a>
            </div>
        </div>
    </section>
);

export default PageHeader;

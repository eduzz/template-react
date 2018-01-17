import React from 'react';
import ModuleList from 'components/ModuleList';
import styles from './styles.css';

const ModulesLessons = () => (
    <div className={styles.component}>
        <div className="form-section">
            <div className='row'>
                <div className='col xl7 s12'>
                    <h3 className='form-section-title'>Módulos e Aulas</h3>

                    <a className='button affirmative waves-effect waves-light'>
                        <span>Adicionar Módulo</span>
                    </a>

                    <a className='button outline-dark waves-effect waves-light'>
                        <span>Importar Módulos</span>
                    </a>

                    {/* <ModuleList onOpen={ moduleId => getLessons(moduleId) } /> */}
                </div>
            </div>
        </div>
    </div>
);

export default ModulesLessons;

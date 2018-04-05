import React from 'react';
import ModuleList from 'components/ModuleList';

const styles = require('./styles.css');

const modulesLessons = ({ courseID }: any) => (
  <div className={styles.component}>
    <div className='form-section'>
      <div className='row'>
        <div className='col xl7 s12'>
          <h3 className='form-section-title'>Módulos e Aulas</h3>

          {/* <a className='button affirmative waves-effect waves-light'>
                        <span>Adicionar Módulo</span>
                    </a> */}

          {/* <a className='button outline-dark waves-effect waves-light'>
                        <span>Importar Módulos</span>
                    </a> */}
        </div>
      </div>
      <div className='row'>
        <div className='col s12'>
          <ModuleList
            courseID={courseID}
            editable={true}
          />
        </div>
      </div>
    </div>
  </div>
);

export default modulesLessons;

import React from 'react';
// import InputRange from '../../../InputRange';
// import Input from '../../../Input';
import TextField from 'material-ui/TextField';
import Toggle from '../../Toggle';

const certificates = () => (
  <section className='form-section'>
    <div className='row'>
      <div className='col m12 l12'>
        <Toggle
          title='Habilitar Certificados'
          description='Com essa opção você habilita o uso de certificados'
        />
      </div>
    </div>
    <div className='row'>
      <div className='col m12 l12'>
        {/* <InputRange min={0} max={100} value={50} /> */}
      </div>
    </div>
    <div className='row'>
      <div className='col m12 l12'>
        <TextField label='Nome do Professor' />
      </div>
    </div>
  </section>
);

export default certificates;

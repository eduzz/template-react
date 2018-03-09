import React from 'react';
import Toggle from '../../../Toggle';
import InputRange from '../../../InputRange';
import Input from '../../../Input';

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
        <InputRange min={0} max={100} value={50} />
      </div>
    </div>
    <div className='row'>
      <div className='col m12 l12'>
        <Input title='Nome do Professor' />
      </div>
    </div>
  </section>
);

export default certificates;

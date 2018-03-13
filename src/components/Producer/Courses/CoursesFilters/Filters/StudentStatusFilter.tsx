import React, { Component } from 'react';
import Section from './Section';

class StudentStatusFilter extends Component<any> {

  render() {
    return (
      <Section active={this.props.active} title='Situação da Matrícula'>
        <div className='input-field'>
          <select id='filter-student-status'>
            <option value=''>Todos</option>
            <option value='active'>Ativo</option>
            <option value='inactive'>Inativo</option>
          </select>
        </div>
      </Section>
    );
  }
}

export default StudentStatusFilter;

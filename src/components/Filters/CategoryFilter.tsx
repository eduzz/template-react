import React, { Component } from 'react';
import Section from './Section';

class CategoryFilter extends Component<any> {

  render() {
    return (
      <Section active={this.props.active} title='Categoria'>
        <div className='input-field'>
          <select>
            <option value=''>Escolha uma categoria</option>
            <option value='1'>Arte e Entretenimento</option>
            <option value='2'>Comercio</option>
            <option value='3'>Tecnologia</option>
          </select>
        </div>
      </Section>
    );
  }
}

export default CategoryFilter;

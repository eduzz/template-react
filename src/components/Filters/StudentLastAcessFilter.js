import React, { Component } from 'react';
import jquery from 'jquery';
import Section from './Section';

class StudentLastAcessFilter extends Component {
  componentDidMount() {
    jquery('#filter-last-acess').material_select();
  }

  render() {
    return (
      <Section active={this.props.active} title="Último Acesso">
        <div className="input-field">
          <select id="filter-last-acess">
            <option value="">Sem Registro</option>
            <option value="1d">1 Dia</option>
            <option value="1w">1 Semana</option>
            <option value="1m">1 Mês</option>
            <option value="1y">1 Ano</option>
          </select>
        </div>
      </Section>
    );
  }
}

export default StudentLastAcessFilter;

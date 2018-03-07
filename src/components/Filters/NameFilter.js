import React, { Component } from 'react';
import Section from './Section';

export default class NameFilter extends Component {
  render() {
    return (
      <Section active={this.props.active} title="Nome">
        <div className="input-field">
          <input
            id="filter-name"
            type="text"
            placeholder="Informe o Nome ou parte dele"
          />
        </div>
      </Section>
    );
  }
}

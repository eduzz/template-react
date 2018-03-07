import React, { Component } from 'react';
import jquery from 'jquery';
import Section from './Section';

class TrackFilter extends Component {
  componentDidMount() {
    jquery('#filter-track').material_select();
  }

  render() {
    return (
      <Section active={this.props.active} title="Pacote">
        <div className="input-field">
          <select id="filter-track">
            <option value="">Todos</option>
            <option value="1">Pacote 1</option>
            <option value="2">Pacote 2</option>
            <option value="3">Pacote 3</option>
          </select>
        </div>
      </Section>
    );
  }
}

export default TrackFilter;

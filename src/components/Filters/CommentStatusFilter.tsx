import React, { Component } from 'react';
import Section from './Section';

class CommentStatusFilter extends Component<any> {

  render() {
    return (
      <Section active={this.props.active} title='Status'>
        <div className='input-field'>
          <select id='filter-status'>
            <option value='all'>Todos</option>
            <option value='new'>Novo (Aguardando Moderação)</option>
            <option value='approved'>Aprovado</option>
            <option value='disapproved'>Reprovado</option>
          </select>
        </div>
      </Section>
    );
  }
}

export default CommentStatusFilter;

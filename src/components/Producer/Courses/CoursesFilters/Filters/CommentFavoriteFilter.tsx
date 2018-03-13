import React, { Component } from 'react';
import Section from './Section';

class CommentFavoriteFilter extends Component<any> {
  render() {
    return (
      <Section active={this.props.active} title='Favorito'>
        <div className='switch'>
          <label>
            <input type='checkbox' id='filter-isfavorite' />
            <span className='lever' />
          </label>
          <label htmlFor='filter-isfavorite'>Exibir somente Favoritos</label>
        </div>
      </Section>
    );
  }
}

export default CommentFavoriteFilter;

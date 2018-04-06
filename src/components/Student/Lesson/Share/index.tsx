import React from 'react';
import Icon from 'components/Icon';

interface IProps {
  url: string;
}

const Share = ({ url }: IProps) => (
  <div className='lesson-actions'>
    <div className='share-bar'>
      <label>Compartilhe</label>
      <div className='social-buttons'>
        <a className='button facebook' href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target='_blank'>
          <Icon name='facebook' />
        </a>
        <a className='button twitter' href={`https://twitter.com/intent/tweet?text=${url}`} target='_blank'>
          <Icon name='twitter' />
        </a>
        <a className='button linkedin' href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`} target='_blank'>
          <Icon name='linkedin' />
        </a>
      </div>
    </div>
    <div className='rating'>
      <label>Avalie essa aula</label>
    </div>
  </div>
);

export default Share;
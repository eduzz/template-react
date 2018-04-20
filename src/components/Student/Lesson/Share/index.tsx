import React from 'react';
import Icon from 'components/Icon';

const styles = require('./styles.css');

interface IProps {
  url: string;
}

const Share = ({ url }: IProps) => (
  url ?
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
    :
    <div className={styles.loading}>
      <div className='share-bar'>
        <div className='line'></div>
        <div className='social-buttons'>
          <div className='button'></div>
          <div className='button'></div>
          <div className='button'></div>
        </div>
      </div>
    </div>
);

export default Share;
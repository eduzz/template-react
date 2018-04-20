import React from 'react';

const styles = require('./styles.css');

interface IProps {
  embed?: string;
}

const Player = ({ embed }: IProps) => (
  embed ?
    <div className='lesson-content' dangerouslySetInnerHTML={{ __html: embed }}></div>
    :
    <div className={styles.loading}>
      <div className='lesson-content'></div>
    </div>
);

export default Player;
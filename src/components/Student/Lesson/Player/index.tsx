import React from 'react';

interface IProps {
  embed?: string;
}

const Player = ({ embed }: IProps) => (
  <div className='lesson-content' dangerouslySetInnerHTML={{ __html: embed }}></div>
);

export default Player;
import React from 'react';
import UpsellList from 'components/Student/UpsellList';

interface IProps {
  text: string;
}

const Description = ({ text }: IProps) => (
  <div className='lesson-description'>
    <div className='row'>
      <div className='col s12 m8 l9' dangerouslySetInnerHTML={{ __html: text }}>
      </div>
      <div className='col s12 m4 l3'>
        <UpsellList courseID={5581} />
      </div>
    </div>
  </div>
);

export default Description;
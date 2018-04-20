import React from 'react';
import UpsellList from 'components/Student/UpsellList';

const styles = require('./styles.css');

interface IProps {
  text: string;
}

const Description = ({ text }: IProps) => (
  text ?
    <div className='lesson-description'>
      <div className='row'>
        <div className='col s12 m8 l9' dangerouslySetInnerHTML={{ __html: text }}>
        </div>
        <div className='col s12 m4 l3'>
          <UpsellList courseID={5581} />
        </div>
      </div>
    </div>
    :
    <div className={styles.loading}>
      <div className='row'>
        <div className='col s12 m8 l9'>
          <div className='lines'>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </div>
        </div>
      </div>
    </div>
);

export default Description;
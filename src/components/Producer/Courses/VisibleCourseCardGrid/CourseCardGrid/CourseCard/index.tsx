import React from 'react';
import { cdn } from 'constants/index';
import { Link } from 'react-router-dom';

const styles = require('./styles.css');

const courseCard = ({ data }: any) => (
  <Link to={`courses/${data.id}`} className={styles.component}>
    <div className={`card-status free-course`}> GRATUITO </div>
    <div className='card-image'>
      <img src={cdn + data.avatar} alt='...' />
    </div>

    <div className='card-description'>
      <p className='card-title'>{data.title}</p>
      <p className='card-category'>{data.category.name}</p>
    </div>
  </Link>
);

export default courseCard;

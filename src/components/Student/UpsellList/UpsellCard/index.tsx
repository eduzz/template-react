import React from 'react';
import { cdn } from 'constants/index';

interface IProps {
  title: string;
  description: string;
  image: string;
  url_checkout: string;
}

const UpsellCard = ({ title, description, image, url_checkout }: IProps) => (
  <div className='upsell-card' >
    <img
      src={cdn + image}
      alt=''
      className='upsell-img'
    />
    <div className='content'>
      <h3 className='upsell-name'>{title}a</h3>
      <p className='upsell-description'>
        {description}
      </p>
      <a href={url_checkout} className='button affirmative'>
        <span>Comprar</span>
      </a>
    </div>
  </div>
);

export default UpsellCard;
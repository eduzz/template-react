import React from 'react';

const UpsellCard = () => (
  <div className='upsell-card'>
    <img
      src='https://cdn.pixabay.com/photo/2014/07/27/13/49/tree-402953__340.jpg'
      alt=''
      className='upsell-img'
    />
    <div className='content'>
      <h3 className='upsell-name'>Curso de Engenharia</h3>
      <p className='upsell-description'>
        Este curso de engenharia contempla todas as matérias necessarias
        para se tornar um bom engenheiro
      </p>
      <a className='button affirmative'>
        <span>Comprar</span>
      </a>
    </div>
  </div>
);

export default UpsellCard;
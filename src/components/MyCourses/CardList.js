import React from 'react';

const CardList = () => (
    <div className="container">
      <div className="cards-wrapper">

        <div className="card course">
          <div className="card-status comming-soon">Em breve</div>
          <div className="card-description">
            <div className="card-title">Fotografia Digital</div>
            <div className="card-category">Arte e Entretenimento</div>
          </div>
        </div>

        <div className="card course">
          <div className="card-status free-course">Gratuito</div>
          <div className="card-description">
            <div className="card-title">Fotografia Digital</div>
            <div className="card-category">Arte e Entretenimento</div>
          </div>
        </div>

      </div>
    </div>
);

export default CardList;

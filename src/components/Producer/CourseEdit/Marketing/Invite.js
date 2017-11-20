import React from 'react';

const Invite = () => (
    <div className="container">
        <div className="form-section">
            <h3 class="form-section-title">Convites</h3>
            <div className="row">
                <div className="m12 l12 col">
                    <div className="form-block">
                        <div className='input-field'>
                            <input id='convite-email' type='text' />
                            <label htmlFor='convite-email'>Digite os E-mails</label>
                        </div>
                    </div>
                </div>                                
            </div>        
            <div className="row">
                <div className="m12 l12 col">
                    <div className="form-block">
                        <div className='input-field'>
                            <input id='convite-csv' type='text' />
                            <label htmlFor='convite-csv'>Importe via .CSV (arquivo separado por virgulas)</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Invite;
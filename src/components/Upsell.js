import React from 'react';
import Icon from '../components/Icon';
import UpsellContentSelect from '../components/UpsellContentSelect';
import UpsellLessonSelect from '../components/UpsellLessonSelect';

const Upsell = () => (
    
    <div className="container">  
        <div className="form-section">
            <h3 class="form-section-title">Upsell do Curso</h3>
            <div className="row">
                <div className="s12 m12 col">
                    <div className="form-block">
                        <h3 className="form-block-title">Imagem para o Upsell</h3>
                        <p className="input-description">Essa foto será utilizada na listagem das aulas ou dentro de uma aula</p>
                        <label className="input-label">Tamanho sugerido: 600x400</label>
                        <a className="input-img card-img">
                            <Icon name='paper' />
                            <span>Alterar Logo</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="form-section">            
            <div className='row'>
                <div className="col m12 l8">
                    <UpsellContentSelect />                   
                </div>
            </div>
        
            <h3 className="form-block-title">Exibir em</h3>
            <div className="row">
                <div className="col m12 l5">
                    <div className="form-block">
                        <input type="radio" className="with-gap" id="upsell-listagem" name="acess-type"/>
                        <label for="upsell-listagem">
                            <span className="radio-title">Listagem de aulas (Padrão)</span>                        
                        </label>
                    </div>
                </div>
                <div className="col m12 l5">
                    <div className="form-block">
                        <input type="radio" className="with-gap" id="upsell-especifica" name="acess-type"/>
                        <label for="upsell-especifica">
                            <span className="radio-title">Dentro de uma aula específica</span>
                        </label>
                    </div>
                </div>
            </div>
        
            <div className='row'>
                <div className="col m12 l8">
                    <UpsellLessonSelect />
                </div>
            </div>
        
            <div className="row">
                <div className="col m12">
                    <div className="form-block">
                        <div className='input-field'>
                            <input id='upsell-titulo' type='text' />
                            <label htmlFor='upsell-titulo'>Título</label>
                        </div>
                    </div>
                </div>                                
            </div>        

            <div className="row">
                <div className="col m12">
                    <div className="form-block">
                        <div className='input-field'>
                            <textarea id='upsell-descricao' className='materialize-textarea'></textarea>
                            <label htmlFor='upsell-descricao'>Descrição</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col m12 l6">
                    <div className="form-block">
                        <div className="switch">
                            <label>
                                <input type="checkbox" id="upsell-comprar"/>
                                <span className="lever"></span>
                            </label>
                            <label for="upsell-comprar">
                                <h3 className="form-block-title">Comprar com um click</h3>
                                <p className="check-description">A venda do conteúdo será realizada com um click</p>
                            </label>
                        </div>                        
                    </div>
                </div>
            </div>

        </div>
    </div>
);

export default Upsell;
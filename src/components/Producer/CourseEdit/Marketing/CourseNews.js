import React from 'react';
import TextEditor from '../components/TextEditor';

const CourseNews = () => (
<div className="container">
    <div className="form-section">        
        <h3 class="form-section-title">Novidades</h3>
        <div className="row">
            <div className="col m12 l12">
                <div className="form-block">                    
                    <div className='input-field'>
                        <input id='novidades-titulo' type='text' />
                        <label htmlFor='novidades-titulo'>Título</label>
                    </div>
                </div>
            </div>                                
        </div>        
        <div className="row">
            <div className="col m12 l12">
                <div className="form-block">
                    <div className='input-field'>
                        <TextEditor />                        
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col m12 l6">
                <div className="form-block">
                    <div className="switch">
                        <label>
                            <input type="checkbox" id="novidades-publicado"/>
                            <span className="lever"></span>
                        </label>
                        <label for="novidades-publicado">
                            <h3 className="form-block-title">Publicado</h3>
                            <p className="check-description">As novidades cadastrada aparecera no menu novidades para o aluno</p>
                        </label>
                    </div>                        
                </div>
            </div>
        </div>
    </div>
</div>
);

export default CourseNews;
import React from 'react';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import ImageUploader from 'components/ImageUploader';
import Icon from 'components/Icon';
import styles from './styles.css';

class Lesson extends React.Component {
    constructor() {
        super();

        this.lessonID = null;
    }

    render() {
        this.lessonID = this.props.match.params.lessonID;

        return (
            <section className={styles.component}>
                    <div className='form-section'>
                        <div className='row'>
                            <div className='col s9'>
                                <div className='col s12'>
                                    <div className='form-block'>
                                        <h3 className='form-block-title'>Titulo da Aula</h3>
                                        <Input />
                                    </div>
                                </div>
                                <div className='col s12'>
                                    <div className='form-block'>
                                        <h3 className='form-block-title'>Descrição da Aula</h3>
                                        <TextArea />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s3'>
                                    <section>
                                        <div className='form-block image-uploader'>
                                            <h3 className="form-block-title">Miniatura do Curso</h3>
                                            <label className="input-label">Tamanho sugerido: 170x220</label>
                                            {/* <a className="input-img card-img">
                                                <Icon name='video' />
                                                <span>Alterar Logo</span>
                                            </a> */}
                                            <ImageUploader
                                                icon='paper'
                                                text='Alterar Logo'
                                            />
                                        </div>
                                	</section>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        );
    }
}

export default Lesson;

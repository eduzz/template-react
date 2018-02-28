import React from 'react';
import Icon from 'components/Icon';
import { v4 } from 'uuid';
import styles from './styles.css';

class FileUploader extends React.Component {
    constructor() {
        super();

        this.inputFileID = v4();
        this.uploadInput = null;
    }

    render() {
        return (
            <div className={styles.component}>
                <div className="row">
                    <div className="col s12">
                        <div className="form-block">
                            <h3 className="form-block-title">Arquivos para download</h3>
                        </div>
                    </div>

                    <div className="col s12">
                        <div className="form-block">
                            <ul className="filesList">
                                {this.props.files.map((file, key) =>
                                    <li key={key}>
                                        <Icon name={file.mimetype} />
                                        {file.title} {file.progress && `(Carregando…${parseInt(file.progress, 10)}%)`}

                                        <button onClick={() => this.props.onRemove(key)} className="btnCancel" type="button"></button>

                                        {file.progress !== undefined && <div className="fileProgress">
                                            <span className="f-45" style={{maxWidth: `${file.progress}%`}}></span>
                                        </div>}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="col s12">
                        <div className="form-block">
                            <label htmlFor={this.inputFileID} className="inputSelect">
                                <span><strong>Adicione arquivos</strong> ou Arraste-os aqui</span>
                            </label>

                            <input
                                className='input-file'
                                id={this.inputFileID}
                                type='file'
                                ref={input => this.uploadInput = input}
                                multiple
                                onChange={e => this.props.onAdd(e.target.files)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileUploader;

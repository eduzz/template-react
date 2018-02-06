import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'components/Icon';
import { v4 } from 'uuid';
import styles from './styles.css';
import actions from 'actions';
import Loading from 'components/Loading';

class ImageUploader extends Component {
    constructor() {
        super();

        this.state = {};

        this.inputFileID = v4();
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        if(file) {
            reader.onloadend = () => {
                this.props.uploadImage(reader.result, 'courseBanner');

                this.setState({
                    imagePreviewUrl: reader.result,
                });
            };

            reader.readAsDataURL(file);
        }
    }

    render() {
        return (
            <div className={styles.component}>
                <div className='input-img large-banner'>
                    <div className='container'>
                        <Loading active={!!this.state.imagePreviewUrl && !this.props.courseBanner.url} absolutePosition={true} />

                        <img
                            className='img-preview'
                            alt=''
                            src={this.state.imagePreviewUrl}
                        />
                        <input
                            className='input-file'
                            id={this.inputFileID}
                            type='file'
                            onChange={e => this.handleImageChange(e)}
                        />
                        <label htmlFor={this.inputFileID} className='button small soft top-right waves-effect'>
                            <Icon name='paper' />
                            <span>Alterar Plano de fundo</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    courseBanner: state.upload.courseBanner || {},
});

const mapDispatchToProps = dispatch => ({
    uploadImage(result, stateLabel) {
        dispatch(actions.uploadImage(result, stateLabel));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);
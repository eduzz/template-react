import React, { Component } from 'react';
import Icon from 'components/Icon';
import { v4 } from 'uuid';
import Loading from 'components/Loading';

const styles = require('./styles.css');

interface IProps {
  large?: boolean;
  value?: string;
  text?: string;
  icon?: string;
  onChange?: any;
}

interface IState {
  imagePreviewUrl: string;
}

class ImageUploader extends Component<IProps, IState> {
  private uploadInput: HTMLInputElement;
  private inputFileID: string;

  constructor(props: IProps) {
    super(props);

    this.state = {
      imagePreviewUrl: '',
    };

    this.inputFileID = v4();
  }

  handleImageChange(e: any) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.onloadend = () => {
        this.props.onChange(reader.result);

        this.setState({
          imagePreviewUrl: reader.result
        });
      };

      reader.readAsDataURL(file);
    }
  }

  handleImageClick = () => {
    if (!this.props.large) {
      this.uploadInput.click();
    }
  }

  render() {
    return (
      <div className={styles.component}>
        <div
          className={`input-img ${this.props.large ? 'large-banner' : 'card-img'}`}
        >
          <div className='container'>
            <Loading
              active={Boolean(this.state.imagePreviewUrl) && !this.props.value}
              absolutePosition={true}
            />

            <img
              className='img-preview'
              alt=''
              src={this.state.imagePreviewUrl || this.props.value}
              onClick={this.handleImageClick}
            />

            <input
              className='input-file'
              id={this.inputFileID}
              type='file'
              ref={input => (this.uploadInput = input)}
              onChange={e => this.handleImageChange(e)}
            />

            <label
              htmlFor={this.inputFileID}
              className={this.props.large ? 'button small soft top-right waves-effect' : 'input-img card-img'}
            >
              <Icon name={this.props.icon} />
              <span>{this.props.text}</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUploader;

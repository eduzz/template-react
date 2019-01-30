import CoreAvatar, { AvatarProps } from '@material-ui/core/Avatar';
import logo from 'assets/svg/nutror-logo.svg';
import React, { PureComponent } from 'react';
import { CDN_URL } from 'settings';

interface IState {
  originalImage: string;
  image: string;
  caracter: string;
}

interface IProps extends AvatarProps {
  src?: string;
  text?: string;
  defaultImage?: string;
  disableCDN?: boolean;
}

export default class Avatar extends PureComponent<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = { originalImage: null, image: null, caracter: '' };
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    let image = props.src;

    if (!props.disableCDN && image) {
      image = CDN_URL + image;
    }

    if (image === null && !props.text) {
      image = logo;
    }

    return {
      ...state,
      originalImage: image,
      image: state.originalImage === image ? state.image : image,
      caracter: (props.text || '').substr(0, 1).toUpperCase()
    };
  }

  onError = () => {
    if (this.props.text) {
      this.setState({ image: null });
      return;
    }

    this.setState({ image: this.props.defaultImage || logo });
  }

  render() {
    const { image, caracter } = this.state;
    const { src, text, defaultImage, ...extraProps } = this.props;

    return (
      <CoreAvatar src={image} {...extraProps} onError={this.onError}>{caracter}</CoreAvatar>
    );
  }
}
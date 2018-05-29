import { Button } from '@material-ui/core';
import React, { PureComponent } from 'react';

import ImageSelector from '../ImageSelector';

interface IState {
  image?: string;
  openedImageSelector: boolean;
}

interface IProps {
}

export default class Image extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { openedImageSelector: false };
  }

  handleOpenSelector() {
    this.setState({ openedImageSelector: true });
  }

  onImageSelectorCompleted(image: string) {
    this.setState({ image, openedImageSelector: false });
  }

  render() {
    const { openedImageSelector, image } = this.state;

    return (
      <div>
        <ImageSelector
          opened={openedImageSelector}
          width={500}
          height={200}
          onComplete={this.onImageSelectorCompleted.bind(this)}
        />

        <Button onClick={this.handleOpenSelector.bind(this)}>Selecionar</Button>

        {image && <img src={image} />}
      </div>
    );
  }
}
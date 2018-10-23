import IconButton from '@material-ui/core/IconButton';
import ImageSelector from 'components/Shared/ImageSelector';
import ImageIcon from 'mdi-react/ImageIcon';
import React from 'react';

import { CERTIFICATE_SIZE } from '../../config';

interface IProps {
  classes?: any;
  onChange: (image: string) => void;
}

interface IState {
  selectorOpened: boolean;
}

export default class ImageUpload extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { selectorOpened: false };
  }

  handleClick = () => {
    this.setState({ selectorOpened: true });
  }

  onSelectorComplete = (image: string) => {
    this.setState({ selectorOpened: false });

    if (!image) return;
    this.props.onChange(image);
  }

  render() {
    const { selectorOpened } = this.state;

    return (
      <div>
        <ImageSelector
          opened={selectorOpened}
          width={CERTIFICATE_SIZE.width}
          height={CERTIFICATE_SIZE.height}
          onComplete={this.onSelectorComplete}
        />
        <IconButton onClick={this.handleClick}>
          <ImageIcon />
        </IconButton>
      </div>
    );
  }
}
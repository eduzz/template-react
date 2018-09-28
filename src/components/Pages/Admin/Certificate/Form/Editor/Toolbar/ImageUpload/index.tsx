import IconButton from '@material-ui/core/IconButton';
import ImageSelector from 'components/Shared/ImageSelector';
import { WithStyles } from 'decorators/withStyles';
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

@WithStyles(theme => ({
  input: {
    position: 'absolute',
    visibility: 'hidden',
  },
  icon: {
    position: 'absolute',
  },
}))
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
    this.props.onChange(image);
  }

  render() {
    const { classes } = this.props;
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
          <ImageIcon className={classes.icon} />
        </IconButton>
      </div>
    );
  }
}
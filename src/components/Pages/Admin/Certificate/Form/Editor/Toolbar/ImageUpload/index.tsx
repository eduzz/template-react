import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from 'mdi-react/ImageIcon';
import { WithStyles } from 'decorators/withStyles';
import ImageSelector from 'components/Shared/ImageSelector';

interface IProps {
  classes?: any;
  onChange?: any;
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

    this.state = {
      selectorOpened: false,
    };
  }

  handleClick = () => {
    this.setState({
      selectorOpened: true,
    });
  }

  onSelectorComplete = (image: string) => {
    this.setState({
      selectorOpened: false,
    });

    this.props.onChange && this.props.onChange(image);
  }

  render() {
    const { classes } = this.props;
    const { selectorOpened } = this.state;

    return (
      <div>
        <ImageSelector
          opened={selectorOpened}
          width={3508}
          height={2479}
          onComplete={this.onSelectorComplete}
        />
        <IconButton onClick={this.handleClick}>
          <ImageIcon className={classes.icon} />
        </IconButton>
      </div>
    );
  }
}
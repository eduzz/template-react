import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import ImageSelector from 'components/Shared/ImageSelector';
// import Button from '@material-ui/core/Button';

interface IProps {
  classes?: any;
  onChange?: any;
  label?: string;
  width: number;
  height: number;
}

interface IState {
  image: string;
  isSelectorOpen: boolean;
}

@WithStyles(theme => ({
  imageLabel: {
    marginBottom: 8,
  },
  imageArea: {
    width: '100%',
    height: 155,
    border: 'solid 1px #c4c4c4',
    cursor: 'pointer',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    transition: `padding-left 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
    border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms`,
    alignItems: 'center',
    '&:hover': {
      borderColor: '#000',
    },
  },
  content: {
    marginBottom: 16,
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#009358',
    height: 40,
    width: 155,
  },
  info: {
    marginTop: 4,
    fontSize: 12,
  }
}))
export default class ImageUploader extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    label: 'image',
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      image: '',
      isSelectorOpen: false,
    };
  }

  handleSelectorComplete = (image: string) => {
    this.setState({
      isSelectorOpen: false,
      image,
    });

    this.props.onChange && this.props.onChange({ [this.props.label]: image });
  }

  handleOpenSelector = () => {
    this.setState({
      isSelectorOpen: true,
    });
  }

  handleClick = () => {
    this.setState({
      isSelectorOpen: true,
    });
  }

  render() {
    const { classes, width, height } = this.props;
    const { image, isSelectorOpen } = this.state;

    return (
      <Fragment>
        <ImageSelector
          opened={isSelectorOpen}
          width={width}
          height={height}
          onComplete={this.handleSelectorComplete}
        />
        <div className={classes.content}>
          <div className={classes.imageArea} onClick={this.handleClick}>
            <img alt='' src={image} className={classes.image} />
          </div>
          <label className={classes.info}>
            Imagem formato jpg ou png
          </label>
        </div>
        {/* <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={this.handleClick}
        >
          Selecionar
        </Button> */}
      </Fragment>
    );
  }
}
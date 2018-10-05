import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import ImageSelector from 'components/Shared/ImageSelector';
import CloudUploadIcon from 'mdi-react/CloudUploadIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
// import Button from '@material-ui/core/Button';

interface IProps {
  classes?: any;
  onChange?: any;
  label?: string;
  width: number;
  height: number;
  image?: any;
  disabled?: boolean;
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
    position: 'relative',
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
    color: '#cbcbcb',
    '&:hover': {
      borderColor: '#000',
      color: '#000',
    },
  },
  content: {
    marginBottom: 16,
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    zIndex: 1,
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
  },
  uploadIcon: {
    position: 'absolute',
    color: 'inherit',
    transition: `color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms`,
  },
  deleteIcon: {
    position: 'absolute',
    color: '#c4c4c4',
    transition: `color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms`,
    zIndex: 2,
    top: 3,
    left: 'calc(100% - 27px)',
    '&:hover': {
      color: '#000',
    },
  },
  disabled: {
    background: '#f3f3f3',
    cursor: 'not-allowed',
    '&:hover': {
      border: 'solid 1px #c4c4c4',
      color: '#cbcbcb',
    },
  },
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

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.image !== state.image)
      return {
        image: props.image,
      };

    return null;
  }

  handleSelectorComplete = (image: string) => {
    this.setState(state => ({
      isSelectorOpen: false,
      image: image || state.image,
    }));

    image && this.props.onChange && this.props.onChange({ [this.props.label]: image });
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

  onRemoveImage = (e: any) => {
    e.stopPropagation();

    this.props.onChange && this.props.onChange({ [this.props.label]: null });
  }

  render() {
    const { classes, width, height, disabled } = this.props;
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
          <div className={`${classes.imageArea} ${disabled && classes.disabled}`} onClick={!disabled ? this.handleClick : null}>
            <CloudUploadIcon className={classes.uploadIcon} />
            {image &&
              <div
                className={classes.deleteIcon}
                onClick={this.onRemoveImage}
              >
                <DeleteIcon />
              </div>
            }
            <img alt='' src={image ? process.env.REACT_APP_CDN_URL + image : null} className={classes.image} />
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
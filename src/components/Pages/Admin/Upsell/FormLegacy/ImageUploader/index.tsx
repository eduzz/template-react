import { FieldHidden } from '@react-form-fields/material-ui';
import ImageSelector from 'components/Shared/ImageSelector';
import { WithStyles } from 'decorators/withStyles';
import CloudUploadIcon from 'mdi-react/CloudUploadIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import React, { Fragment, SyntheticEvent } from 'react';
import { CDN_URL } from 'settings';

interface IProps {
  classes?: any;
  label?: string;
  width: number;
  height: number;
  disabled?: boolean;
  image?: string;
  value: string;
  onChange: (image: string) => void;
}

interface IState {
  isSelectorOpen: boolean;
}

@WithStyles({
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
})
export default class ImageUploader extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    label: 'image',
  };

  constructor(props: IProps) {
    super(props);
    this.state = { isSelectorOpen: false };
  }

  openSelector = () => {
    this.setState({ isSelectorOpen: true });
  }

  handleSelectorComplete = (image: string) => {
    this.setState({ isSelectorOpen: false });

    if (!image) return;
    image && this.props.onChange && this.props.onChange(image);
  }

  onRemoveImage = (e: SyntheticEvent) => {
    e.stopPropagation();
    this.props.onChange(null);
  }

  render() {
    const { classes, width, height, disabled, value } = this.props;
    const { isSelectorOpen } = this.state;

    return (
      <Fragment>
        <ImageSelector
          opened={isSelectorOpen}
          width={width}
          height={height}
          onComplete={this.handleSelectorComplete}
        />

        <div className={classes.content}>
          <div
            className={`${classes.imageArea} ${disabled && classes.disabled}`}
            onClick={!disabled ? this.openSelector : null}
          >
            <CloudUploadIcon size={50} className={classes.uploadIcon} />

            {value &&
              <div className={classes.deleteIcon} onClick={this.onRemoveImage}>
                <DeleteIcon />
              </div>
            }
            <img src={value ? CDN_URL + value : null} className={classes.image} />
          </div>

          <FieldHidden
            value={value}
            validation={disabled ? '' : 'required'}
          />
        </div>
      </Fragment>
    );
  }
}
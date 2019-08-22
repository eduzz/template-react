import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconMessage from 'components/Shared/IconMessage';
import { WithStyles } from 'decorators/withStyles';
import FolderDownloadIcon from 'mdi-react/FolderDownloadIcon';
import FolderOpenIcon from 'mdi-react/FolderOpenIcon';
import React, { DragEvent, Fragment, PureComponent } from 'react';

import Toast from '../Toast';

export interface IImageReaderResult {
  url: string;
  width: number;
  height: number;
}

interface IState {
  loading: boolean;
  draggingOver: boolean;
}

interface IProps {
  droppable?: boolean;
  className?: string;
  onLoad: (result: IImageReaderResult) => void;
  classes?: any;
}

@WithStyles({
  progress: {
    marginRight: 5
  },
  dropArea: {
    width: '100%',
    maxHeight: '100%',
    border: '2px dashed #00000029',
    borderRadius: '3px',
    textAlign: 'center',
    paddingBottom: 20,
    height: 180
  },
  dropAreaProgress: {
    marginTop: 60
  },
  dropAreaDragging: {
    background: '#fff10a1f'
  },
  dropAreaDraggingChildren: {
    pointerEvents: 'none'
  }
})
export default class ImageReader extends PureComponent<IProps, IState> {
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  extensions = ['png', 'gif', 'jpeg', 'jpg', 'bmp'];

  constructor(props: IProps) {
    super(props);
    this.state = { loading: false, draggingOver: false };
  }

  handleSelectImage = () => {
    this.inputRef.current.click();
  };

  onFileSelected = () => {
    if (!this.inputRef.current.files.length) return;

    this.setState({ loading: true });

    this.loadFile(this.inputRef.current.files[0]);
    this.inputRef.current.value = '';
  };

  onDropFile = (event: DragEvent<any>) => {
    event.preventDefault();

    this.setState({ draggingOver: false });

    if (this.state.loading) return;
    this.loadFile(event.dataTransfer.files[0]);
  };

  onDragIn = (event: DragEvent<any>) => this.onDragInOut(true, event);
  onDragOut = (event: DragEvent<any>) => this.onDragInOut(false, event);

  onDragInOut = (draggingOver: boolean, event: DragEvent<any>) => {
    event.preventDefault();

    if (this.state.loading) return;

    if (this.state.draggingOver === draggingOver) return;
    this.setState({ draggingOver });
  };

  loadFile = (file: File) => {
    const regexp = new RegExp(`.(${this.extensions.join('|')})$`, 'gi');

    if (!regexp.test(file.name)) {
      Toast.show(`Apenas imagens: ${this.extensions.join(', ')}`);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => this.getImageDimensions(e.target.result);
    reader.onerror = () => {
      Toast.show('Não conseguimos carregar a imagem');
      this.setState({ loading: false });
    };

    reader.readAsDataURL(file);
  };

  getImageDimensions = (url: string) => {
    const image = new Image();

    image.onload = () => {
      setTimeout(() => {
        this.setState({ loading: false });
        this.props.onLoad({ url, width: image.width, height: image.height });
      }, 1000);
    };

    image.onerror = () => {
      Toast.show('Não conseguimos carregar a imagem');
      this.setState({ loading: false });
    };

    image.src = url;
  };

  render() {
    const { droppable } = this.props;

    return droppable ? this.renderArea() : this.renderButton();
  }

  renderArea = () => {
    const { draggingOver, loading } = this.state;
    const { classes, className } = this.props;

    return (
      <div
        className={`${classes.dropArea} ${className || ''} ${draggingOver ? classes.dropAreaDragging : null}`}
        onDrop={this.onDropFile}
        onDragOver={this.onDragIn}
        onDragLeave={this.onDragOut}
      >
        {loading && <CircularProgress color='secondary' size={50} className={classes.dropAreaProgress} />}

        {!loading && (
          <Fragment>
            <div className={classes.dropAreaDraggingChildren}>
              <IconMessage icon={FolderDownloadIcon} message='Arraste e solte a imagem aqui ou' />
            </div>

            <div className={draggingOver ? classes.dropAreaDraggingChildren : null}>{this.renderButton()}</div>
          </Fragment>
        )}
      </div>
    );
  };

  renderButton = () => {
    const { loading } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <input
          type='file'
          ref={this.inputRef}
          className='hide'
          onChange={this.onFileSelected}
          accept={`.${this.extensions.join(',.')}`}
        />

        <Button color='secondary' disabled={loading} onClick={this.handleSelectImage}>
          {loading ? <CircularProgress className={classes.progress} size={20} /> : <FolderOpenIcon />}
          {loading ? 'Carregando' : 'Selecionar'}
        </Button>
      </Fragment>
    );
  };
}

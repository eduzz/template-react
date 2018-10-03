import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import transparencyImage from 'assets/images/transparency.png';
import { WithStyles } from 'decorators/withStyles';
import imageCompress from 'helpers/imagerCompress';
import { Subscription } from 'indefinite-observable';
import React, { Fragment, PureComponent } from 'react';
import { Cropper } from 'react-image-cropper';
import rxjsOperators from 'rxjs-operators';
import uploadService from 'services/upload';

import Toast from '../Toast';
import ImageReader, { ImageReaderResult } from './ImageReader';

interface IState {
  image?: ImageReaderResult;
  saving: boolean;
  progress: number;
  dimentions?: { width: number, height: number };
}

interface IProps {
  opened: boolean;
  width: number;
  height: number;
  onComplete: (image: string) => void;
  classes?: any;
}

@WithStyles({
  imageContainer: {
    margin: 'auto',
    '& > .cropper': {
      background: `url('${transparencyImage}') repeat`,
      boxShadow: '5px 5px 10px #00000040',
    }
  },
  imageContainerSaving: {
    '& > .cropper': {
      pointerEvents: 'none',
      opacity: 0.5,
    }
  },
  content: {
    overflow: 'auto',
    width: '95vw',
    maxHeight: 'calc(100vh - 140px) !important'
  }
})
export default class ImageSelector extends PureComponent<IProps, IState> {
  canvas: HTMLCanvasElement;
  resizeTimeout: NodeJS.Timer;
  uploadSubscription: Subscription;
  cropper: any;

  constructor(props: IProps) {
    super(props);
    this.state = { image: null, saving: false, progress: 0 };
  }

  componentDidMount() {
    window.addEventListener('resize', this.reCalculateRegion);
  }

  componentWillMount() {
    window.removeEventListener('resize', this.reCalculateRegion);
  }

  onExited = () => {
    this.uploadSubscription && this.uploadSubscription.unsubscribe();
    this.setState({ image: null, saving: false, progress: 0 });
  }

  handleSave = async () => {
    const { width, height } = this.props;

    this.setState({ saving: true, progress: 0 });
    const image = await imageCompress(this.cropper.crop(), width, height);

    this.uploadSubscription && this.uploadSubscription.unsubscribe();
    this.uploadSubscription = uploadService.saveImage(image).pipe(
      rxjsOperators.bindComponent(this),
      rxjsOperators.logError()
    ).subscribe(({ url, progress }) => {
      this.setState({ progress });

      if (url && this.props.opened) {
        this.setState({ saving: false });
        this.props.onComplete(url);
      }
    }, err => {
      this.setState({ saving: false });
      Toast.error(err);
    });
  }

  handleCancel = () => {
    this.props.onComplete(null);
  }

  setImage = (image: ImageReaderResult) => {
    this.setState({ image: null });

    const dimentions = this.calculateRegion(image.width, image.height);
    this.setState({ image, dimentions });
  }

  reCalculateRegion = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      const { image, dimentions } = this.state;
      if (!image) return;

      const newDimentions = this.calculateRegion(image.width, image.height);

      if (newDimentions.width === dimentions.width && newDimentions.height === dimentions.height) {
        return;
      }

      this.setState({ image: null }, () => {
        this.setState({ image, dimentions: newDimentions });
      });
    }, 500);
  }

  calculateRegion = (width: number, height: number): IState['dimentions'] => {
    const dialogWidth = window.innerWidth - 90;
    const dialogHeight = window.innerHeight - 180;

    if (height <= dialogHeight && width <= dialogWidth) {
      return { width: Math.floor(width), height: Math.floor(height) };
    }

    if (width > dialogWidth) {
      const widthRatio = dialogWidth / width;
      return this.calculateRegion(dialogWidth, height * widthRatio);
    }

    const heightRatio = dialogHeight / height;
    return this.calculateRegion(width * heightRatio, dialogHeight);
  }

  render() {
    const { image, dimentions, saving, progress } = this.state;
    const { classes, opened, width, height } = this.props;

    return (
      <Fragment>
        <Dialog
          open={opened}
          maxWidth={false}
          disableBackdropClick
          disableEscapeKeyDown
          onExited={this.onExited}
          TransitionComponent={Transition}
        >

          <DialogTitle>
            <Grid container spacing={24} alignContent='center'>
              <Grid item xs={true}>
                Selecionar Imagem
                <Typography variant='body1'>
                  <strong>Tamanho sugerido:</strong> {height}px de altura {width}px de largura
                </Typography>
              </Grid>
              {image && !saving &&
                <Grid item xs={false}>
                  <ImageReader onLoad={this.setImage} />
                </Grid>
              }
            </Grid>
          </DialogTitle>
          <DialogContent className={classes.content}>

            {!image &&
              <ImageReader onLoad={this.setImage} droppable />
            }

            {image &&
              <div className={`${classes.imageContainer} ${saving ? classes.imageContainerSaving : ''}`} style={dimentions}>
                {saving &&
                  <LinearProgress
                    color='secondary'
                    variant={progress > 0 && progress < 100 ? 'determinate' : 'indeterminate'}
                    value={progress}
                  />
                }

                <div className='cropper'>
                  <Cropper
                    src={image.url}
                    ratio={width / height}
                    width={width}
                    height={height}
                    allowNewSelection={false}
                    ref={(ref: any) => this.cropper = ref}
                  />
                </div>
              </div>
            }

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel}>Cancelar</Button>
            <Button disabled={!image || saving} color='secondary' onClick={this.handleSave}>OK</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
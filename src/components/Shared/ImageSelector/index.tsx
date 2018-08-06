import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Typography } from '@material-ui/core';
import { WithStyles } from 'decorators/withStyles';
import imageCompress from 'helpers/imagerCompress';
import React, { Fragment, PureComponent } from 'react';
import { Cropper } from 'react-image-cropper';

import ImageReader, { ImageReaderResult } from './ImageReader';

interface IState {
  image?: ImageReaderResult;
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
    background: `url('${require('assets/images/transparency.png')}') repeat`,
    boxShadow: '5px 5px 10px #00000040',
    margin: 'auto'
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
  cropper: any;

  constructor(props: IProps) {
    super(props);
    this.state = { image: null };
  }

  componentDidMount() {
    window.addEventListener('resize', this.reCalculateRegion);
  }

  componentWillMount() {
    window.removeEventListener('resize', this.reCalculateRegion);
  }

  onExited = () => {
    this.setState({ image: null });
  }

  handleSave = async () => {
    const { width, height } = this.props;

    const result = await imageCompress(this.cropper.crop(), width, height);
    this.props.onComplete(result);
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
    const { image, dimentions, } = this.state;
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
              {image &&
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
              <div className={classes.imageContainer} style={dimentions}>
                <Cropper
                  src={image.url}
                  ratio={width / height}
                  width={width}
                  height={height}
                  allowNewSelection={false}
                  ref={(ref: any) => this.cropper = ref}
                />
              </div>
            }

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel}>Cancelar</Button>
            <Button disabled={!image} color='secondary' onClick={this.handleSave}>OK</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
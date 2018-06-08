import { Button, Grid, Typography } from '@material-ui/core';
import { postMultipart } from 'api';
import Alert from 'components/Alert';
import ImageSelector from 'components/ImageSelector';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

interface IState {
  saving?: boolean;
  tempImage?: string;
  openedImageSelector: boolean;
}

interface IProps {
  label: string;
  helperText?: string;
  disabled?: boolean;
  value: string;
  width: number;
  height: number;
  onChange: (image: string) => void;
  className?: string;
  classes?: any;
}

@WithStyles({
  image: {
    maxWidth: '100%',
    marginTop: 10
  },
  marginBottom: {
    marginBottom: 10
  }
})
export default class Image extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { openedImageSelector: false };
  }

  handleOpenSelector() {
    this.setState({ openedImageSelector: true });
  }

  async handleRemove() {
    const { label, onChange } = this.props;

    const ok = await Alert.confirm(`Deseja realmente remover a image: ${label}?`);
    if (!ok) return;

    onChange(null);
  }

  async onImageSelectorCompleted(image: string) {
    this.setState({ openedImageSelector: false, tempImage: image });

    const data = new FormData();
    data.append('file', this.dataURItoBlob(image), `${Date.now()}.png`);

    await postMultipart('/upload', data);

    this.props.onChange(image);
  }

  dataURItoBlob(dataURI: string) {
    const byteString = dataURI.split(',')[0].indexOf('base64') >= 0 ?
      atob(dataURI.split(',')[1]) :
      unescape(dataURI.split(',')[1]);

    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  render() {
    const { openedImageSelector, tempImage, saving } = this.state;
    const { label, helperText, value, width, height, classes, className, disabled } = this.props;

    return (
      <div className={className}>
        <Typography variant='subheading'>{label}</Typography>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={11}>
            <img src={value || tempImage || `https://via.placeholder.com/${width}x${height}`} className={classes.image} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1}>
            <ImageSelector
              opened={openedImageSelector}
              width={width}
              height={height}
              onComplete={this.onImageSelectorCompleted.bind(this)}
            />

            <Typography className={classes.marginBottom}>{helperText}</Typography>

            <Button
              fullWidth
              variant='raised'
              color='secondary'
              disabled={disabled || saving}
              className={classes.marginBottom}
              onClick={this.handleOpenSelector.bind(this)}>
              Selecionar
            </Button>

            <Button
              fullWidth
              variant='outlined'
              disabled={!value || disabled || saving}
              onClick={this.handleRemove.bind(this)}>
              Remover
            </Button>

          </Grid>
        </Grid>
      </div>
    );
  }
}
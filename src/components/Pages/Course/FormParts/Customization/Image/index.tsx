import { Button, Grid, Typography } from '@material-ui/core';
import Alert from 'components/Alert';
import ImageSelector from 'components/ImageSelector';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

interface IState {
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

  onImageSelectorCompleted(image: string) {
    this.setState({ openedImageSelector: false });
    this.props.onChange(image);
  }

  render() {
    const { openedImageSelector } = this.state;
    const { label, helperText, value, width, height, classes, className, disabled } = this.props;

    return (
      <div className={className}>
        <Typography variant='subheading'>{label}</Typography>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={11}>
            <img src={value || `https://via.placeholder.com/${width}x${height}`} className={classes.image} />
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
              disabled={disabled}
              className={classes.marginBottom}
              onClick={this.handleOpenSelector.bind(this)}>
              Selecionar
            </Button>

            <Button
              fullWidth
              variant='outlined'
              disabled={!value || disabled}
              onClick={this.handleRemove.bind(this)}>
              Remover
            </Button>

          </Grid>
        </Grid>
      </div>
    );
  }
}
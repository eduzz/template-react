import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import FormHelperText from '@material-ui/core/FormHelperText';
import MonitorIcon from 'mdi-react/MonitorIcon';
import CellphoneIcon from 'mdi-react/CellphoneIcon';
import Button from '@material-ui/core/Button';
import ImageSelector from 'components/Shared/ImageSelector';
import { CDN_URL } from 'settings';

export interface IMiniature {
  title?: string;
  image?: string;
}

interface ISize {
  width: number;
  height: number;
}

export interface IResolution {
  large: ISize;
  medium?: ISize;
  small?: ISize;
}

interface IProps {
  classes?: any;
  miniature?: IMiniature[];
  resolution?: IResolution;
  helperText?: string;
}

interface IState {
  selectedResolution: 'large' | 'medium' | 'small';
  isSelectorOpen: boolean;
  images: {
    large: string;
    medium: string;
    small: string;
  };
}

const MAX_WIDTH = 600;

@WithStyles(theme => ({
  miniatureContainer: {
    width: 170,
  },
  miniature: {
    width: 111,
  },
  imageContainer: {
    width: MAX_WIDTH,
  },
  imagePlaceholder: {
    borderRadius: 4,
    backgroundColor: '#EEEEEE',
    maxWidth: '100%',
  },
  image: {
    borderRadius: 4,
    width: MAX_WIDTH,
  },
  responsiveContainer: {
    width: 'fit-content',
    borderRadius: 4,
    border: '1px solid',
    borderColor: theme.palette.text.primary,
  },
  responsiveOption: {
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    padding: theme.spacing.unit,
    display: 'flex',
    fill: theme.palette.text.primary,
    alignItems: 'center',
    '&:nth-child(2)': {
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderColor: theme.palette.text.primary,
    },
  },
  selectedOption: {
    backgroundColor: theme.palette.text.primary,
    fill: theme.palette.primary.contrastText,
  },
  icon: {
    margin: '0',
    fill: 'inherit',
  },
  button: {
    width: 263,
  },
  info: {
    width: 250,
  },
}))
export default class ImageUploader extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedResolution: 'large',
      isSelectorOpen: false,
      images: {
        large: '',
        medium: '',
        small: '',
      },
    };
  }

  handleSelectResolution = (label: 'large' | 'medium' | 'small') => () => {
    this.setState({
      selectedResolution: label
    });
  }

  handleRemoveImage = () => {
    this.setState(state => ({
      images: {
        ...state.images,
        [state.selectedResolution]: '',
      },
    }));
  }

  handleSelectorComplete = (image: string) => {
    this.setState(state => ({
      images: {
        ...state.images,
        [state.selectedResolution]: image,
      },
      isSelectorOpen: false,
    }));
  }

  handleOpenSelector = () => {
    this.setState({
      isSelectorOpen: true,
    });
  }

  render() {
    const { classes, miniature, helperText, resolution } = this.props;
    const { selectedResolution, isSelectorOpen, images } = this.state;

    let imagePlaceholderHeight = resolution[selectedResolution].height;

    if (resolution[selectedResolution].width > resolution[selectedResolution].height && resolution[selectedResolution].width > MAX_WIDTH)
      imagePlaceholderHeight = (resolution[selectedResolution].height / resolution[selectedResolution].width) * MAX_WIDTH;

    return (
      <Grid container spacing={16}>
        <Grid item className={classes.miniatureContainer}>
          <Grid container direction='column' spacing={16}>
            {(miniature || []).map((m, index: number) =>
              <Grid key={index} item>
                <Typography variant='caption' gutterBottom>
                  <strong>{m.title}</strong>
                </Typography>
                <img
                  className={classes.miniature}
                  alt=''
                  src={m.image}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={true}>
          <div className={classes.imageContainer}>
            {!images[selectedResolution] ?
              <div
                className={classes.imagePlaceholder}
                style={{
                  width: resolution[selectedResolution].width,
                  height: imagePlaceholderHeight,
                }}
              />
              :
              <img
                alt=''
                src={!!images[selectedResolution] ? CDN_URL + images[selectedResolution] : null}
                className={classes.image}
              />
            }
          </div>
          {!!helperText && <FormHelperText margin='dense'>{helperText}</FormHelperText>}
        </Grid>
        <Grid item xs={false}>
          <Grid container direction='column' spacing={16}>
            {!!resolution && (!!resolution.medium || !!resolution.small) &&
              <Grid item>
                <Typography variant='caption'>Responsivo</Typography>
                <Grid container className={classes.responsiveContainer}>
                  <Grid item className={`${classes.responsiveOption} ${selectedResolution === 'large' && classes.selectedOption}`} onClick={this.handleSelectResolution('large')}>
                    <MonitorIcon className={classes.icon} />
                  </Grid>
                  {!!resolution.medium &&
                    <Grid item className={`${classes.responsiveOption} ${selectedResolution === 'medium' && classes.selectedOption}`} onClick={this.handleSelectResolution('medium')}>
                      <CellphoneIcon className={classes.icon} />
                    </Grid>
                  }
                  {!!resolution.small &&
                    <Grid item className={`${classes.responsiveOption} ${selectedResolution === 'small' && classes.selectedOption}`} onClick={this.handleSelectResolution('small')}>
                      <CellphoneIcon size={20} className={classes.icon} />
                    </Grid>
                  }
                </Grid>
              </Grid>
            }
            <Grid item>
              <ImageSelector
                opened={isSelectorOpen}
                width={resolution[selectedResolution].width}
                height={resolution[selectedResolution].height}
                onComplete={this.handleSelectorComplete}
              />
              <Button variant='contained' color='secondary' className={classes.button} onClick={this.handleOpenSelector}>
                Alterar Imagem
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' color='primary' className={classes.button} onClick={this.handleRemoveImage}>
                Remover Imagem
              </Button>
            </Grid>
            <Grid item className={classes.info}>
              <Typography variant='body2'>Essa foto será utilizada nas listagens do curso</Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2'>
                Formatos Recomendados: <br />
                JPG, PNG <br />
                {resolution[selectedResolution].width} de  largura <br />
                {resolution[selectedResolution].height} de altura
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
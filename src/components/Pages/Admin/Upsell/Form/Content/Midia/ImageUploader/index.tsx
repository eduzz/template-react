import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageSelector from 'components/Shared/ImageSelector';
import { WithStyles } from 'decorators/withStyles';
import CellphoneIcon from 'mdi-react/CellphoneIcon';
import MonitorIcon from 'mdi-react/MonitorIcon';
import React, { PureComponent } from 'react';
import { CDN_URL } from 'settings';

export interface IMiniature {
  title?: string;
  image?: string;
}

interface ISize {
  width: number;
  height: number;
  image: string;
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
  onUploaded?: any;
  onRemoved?: (label: string) => void;
  error?: boolean;
}

interface IState {
  selectedResolution: 'large' | 'medium' | 'small';
  isSelectorOpen: boolean;
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
    maxWidth: '100%'
  },
  imagePlaceholder: {
    borderRadius: 4,
    backgroundColor: '#EEEEEE',
    maxWidth: '100%',
  },
  image: {
    borderRadius: 4,
    maxWidth: '100%',
    maxHeight: 200
  },
  imageError: {
    border: '1px solid #eb442c',
  },
  textError: {
    color: '#eb442c',
  },
  responsiveContainer: {
    width: 'fit-content',
    borderRadius: 4,
    border: '1px solid',
    borderColor: theme.palette.text.primary,
  },
  responsiveOption: {
    position: 'relative',
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
  warningIcon: {
    position: 'absolute',
    color: theme.palette.primary.contrastText,
    top: -10,
    left: 'calc(100% - 15px)',
    backgroundColor: '#FABB0A',
    borderRadius: '50%',
    height: 24,
    width: 24,
    paddingTop: 2,
    zIndex: 10,
  },
}))
export default class ImageUploader extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedResolution: 'large',
      isSelectorOpen: false,
    };
  }

  handleSelectResolution = (label: 'large' | 'medium' | 'small') => () => {
    this.setState({
      selectedResolution: label
    });
  }

  handleRemoveImage = () => {
    this.props.onRemoved(this.state.selectedResolution);
  }

  handleSelectorComplete = (image: string) => {
    this.setState({
      isSelectorOpen: false,
    });

    this.props.onUploaded({ [this.state.selectedResolution]: image });
  }

  handleOpenSelector = () => {
    this.setState({
      isSelectorOpen: true,
    });
  }

  render() {
    const { classes, miniature, helperText, resolution, error } = this.props;
    const { selectedResolution, isSelectorOpen } = this.state;

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
            {!resolution[selectedResolution].image ?
              <div
                className={`${classes.imagePlaceholder} ${!!error && classes.imageError}`}
                style={{
                  width: resolution[selectedResolution].width,
                  height: imagePlaceholderHeight,
                }}
              />
              :
              <img
                alt=''
                src={!!resolution[selectedResolution].image ? CDN_URL + resolution[selectedResolution].image : null}
                className={classes.image}
              />
            }
          </div>
          {(!!helperText && !error) && <FormHelperText margin='dense'>{helperText}</FormHelperText>}
          {!!error && <FormHelperText className={classes.textError} margin='dense'>Obrigatório</FormHelperText>}
        </Grid>
        <Grid item xs={false}>
          <Grid container direction='column' spacing={16}>
            {!!resolution && (!!resolution.medium || !!resolution.small) &&
              <Grid item>
                <Typography variant='caption'>Responsivo</Typography>
                <Grid container className={classes.responsiveContainer}>
                  <Grid
                    item
                    className={`${classes.responsiveOption} ${selectedResolution === 'large' && classes.selectedOption}`}
                    onClick={this.handleSelectResolution('large')}
                  >
                    <MonitorIcon className={classes.icon} />
                  </Grid>
                  {!!resolution.medium &&
                    <Grid
                      item
                      className={`${classes.responsiveOption} ${selectedResolution === 'medium' && classes.selectedOption}`}
                      onClick={this.handleSelectResolution('medium')}
                    >
                      <CellphoneIcon className={classes.icon} />
                      {!resolution['medium'].image &&
                        <div className={classes.warningIcon}>
                          <Typography variant='subtitle2' align='center' color='inherit'>!</Typography>
                        </div>
                      }
                    </Grid>
                  }
                  {!!resolution.small &&
                    <Grid
                      item
                      className={`${classes.responsiveOption} ${selectedResolution === 'small' && classes.selectedOption}`}
                      onClick={this.handleSelectResolution('small')}
                    >
                      <CellphoneIcon size={20} className={classes.icon} />
                      {!resolution['small'].image &&
                        <div className={classes.warningIcon}>
                          <Typography variant='subtitle2' align='center' color='inherit'>!</Typography>
                        </div>
                      }
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
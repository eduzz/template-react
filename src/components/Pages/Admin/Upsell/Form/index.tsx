import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import ImageUploader from './ImageUploader';

interface IProps {
  classes?: any;
  onChange?: any;
}

interface IState {
  title: string;
  description: string;
  isSelectorOpen: boolean;
}

@WithStyles(theme => ({
  root: {
    padding: 16,
  },
  titleLabel: {
    marginBottom: 8,
  },
  descriptionLabel: {
    margin: '16px 0 8px 0',
  },
  imageLabel: {
    marginBottom: 8,
  },
  imageContainer: {
    paddingTop: 27,
  },
  imageArea: {
    width: 'fit-content',
    minWidth: 231,
    height: 155,
    border: 'solid 1px #c4c4c4',
    borderRadius: 4,
    marginBottom: 16,
  },
  image: {
    height: '100%',
  },
  highlightImageContainer: {
    paddingTop: 8,
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#009358',
    height: 40,
    width: 155,
  },
}))
export default class Form extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      title: '',
      description: '',
      isSelectorOpen: false,
    };
  }

  handleChange = (e: any) => {
    const state = { [e.target.name]: e.target.value } as any;

    this.setState(state);

    this.props.onChange && this.props.onChange(state);
  }

  render() {
    const { classes, onChange } = this.props;
    const { title, description } = this.state;

    return (
      <Paper className={classes.root}>
        <Grid container spacing={32}>
          <Grid item xs={12} lg={5}>
            <FormControl fullWidth>
              <label className={classes.titleLabel}>
                Título
              </label>
              <TextField
                value={title}
                name='title'
                onChange={this.handleChange}
                variant='outlined'
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth>
              <label className={classes.descriptionLabel}>
                Descrição
              </label>
              <TextField
                value={description}
                name='description'
                placeholder='130 Caracteres'
                onChange={this.handleChange}
                variant='outlined'
                fullWidth
                multiline
                rows={4}
                inputProps={{
                  maxLength: 130,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={5}>
            <label className={classes.imageLabel}>
              Selecione as Imagens
            </label>
            <div className={classes.highlightImageContainer}>
              <ImageUploader
                width={1840}
                height={460}
                label='highlightImage'
                onChange={onChange}
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.imageContainer}>
              <ImageUploader
                width={250}
                height={250}
                label='image'
                onChange={onChange}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
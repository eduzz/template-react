import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';

interface IProps {
  classes?: any;
  onChange?: any;
  title?: string;
  description?: string;
  error?: boolean;
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
export default class Info extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      title: '',
      description: '',
      isSelectorOpen: false,
    };
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.title !== state.title || props.description !== state.description)
      return {
        title: props.title,
        description: props.description,
      };

    return null;
  }

  handleChange = (e: any) => {
    const state = { [e.target.name]: e.target.value } as any;

    this.setState(state);

    this.props.onChange && this.props.onChange(state);
  }

  render() {
    const { classes, error } = this.props;
    const { title, description } = this.state;

    return (
      <Paper className={classes.root}>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <FormControl fullWidth error={error && !title}>
              <label className={classes.titleLabel}>
                Título
              </label>
              <TextField
                value={title}
                name='title'
                onChange={this.handleChange}
                variant='outlined'
                fullWidth
                error={error && !title}
              />
              {error && !title && <FormHelperText className={classes.errorLabel}>Campo obrigatório</FormHelperText>}
            </FormControl>
            <FormControl fullWidth error={error && !description}>
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
                error={error && !description}
              />
              {error && !description && <FormHelperText className={classes.errorLabel}>Campo obrigatório</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
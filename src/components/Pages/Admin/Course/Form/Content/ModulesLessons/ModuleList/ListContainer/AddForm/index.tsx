import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'mdi-react/AddIcon';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
  onAdd: Function;
}

interface IState {
  text: string;
}

@WithStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  textField: {
    marginRight: 8,
  },
})
export default class AddForm extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      text: '',
    };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onAdd(this.state.text);
  }

  handleChange = (e: any) => {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    const { text } = this.state;
    const { classes } = this.props;

    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <TextField
          className={classes.textField}
          value={text}
          onChange={this.handleChange}
          fullWidth
          placeholder='Adicione um novo módulo'
        />
        <IconButton type='submit' disabled={!text}>
          <AddIcon />
        </IconButton>
      </form>
    );
  }
}
import React, { SyntheticEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { WithStyles } from 'decorators/withStyles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'mdi-react/AddIcon';
import RxOp from 'rxjs-operators';
import categoryService from 'services/category';
import Toast from 'components/Shared/Toast';

interface IProps {
  classes?: any;
}

interface IState {
  value: string;
}

@WithStyles({
  root: {
    display: 'flex',
    marginBottom: 16,
  },
  input: {
    marginRight: 8,
  },
})
export default class CategoriesForm extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    categoryService.addCategory(this.state.value).pipe(
      RxOp.logError(),
      RxOp.loader(),
      RxOp.bindComponent(this),
    ).subscribe((categories: any) => {
      Toast.show('Categoria Adicionada com sucesso!');
    }, (error: any) => Toast.error('Erro ao adicionar categoria!'));
  }

  handleChange = (e: any) => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <TextField
          className={classes.input}
          value={value}
          onChange={this.handleChange}
          placeholder='Adicione uma nova categoria'
          fullWidth
        />
        <IconButton type='submit'>
          <AddIcon />
        </IconButton>
      </form>
    );
  }
}
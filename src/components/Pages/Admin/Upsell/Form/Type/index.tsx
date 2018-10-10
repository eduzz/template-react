import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import upsellService from 'services/upsell';
import rxjsOperators from 'rxjs-operators';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDropDownIcon from 'mdi-react/ArrowDropDownIcon';
import { WithRouter } from 'decorators/withRouter';
import FormHelperText from '@material-ui/core/FormHelperText';

interface IProps {
  classes?: any;
  onChange?: any;
  type?: number;
  content?: string;
  match?: any;
  error?: boolean;
}

interface IState {
  products: any;
}

@WithRouter()
@WithStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
  },
  select: {
    width: 200,
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  content: {
    marginTop: 8,
    display: 'flex',
  },
  progressContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    position: 'absolute',
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  errorLabel: {
    marginRight: 'auto',
  },
}))
export default class Type extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    if (!this.props.match.params.id)
      this.loadData(this.props.type);
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (prevProps.type !== this.props.type) {
      this.loadData(this.props.type);
    }
  }

  loadData = (type: number) => {
    upsellService.getProducts(type).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((products: any) => {
      this.setState({
        products,
      });
    });
  }

  handleClick = (value: number) =>
    () => {
      this.setState({
        products: [],
      });

      const { onChange } = this.props;

      if (onChange) {
        onChange({
          type: value,
          content: '',
        });
      }

      this.loadData(value);
    }

  handleChange = (e: any) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange({
        content: e.target.value,
      });
    }
  }

  render() {
    const { classes, type, content, error } = this.props;
    const { products } = this.state;

    return (
      <div className={classes.root}>
        <FormControl fullWidth error={error}>
          <label className={classes.title}>
            Escolha um produto
          </label>
          <div className={classes.content}>
            <FormControlLabel
              control={
                <Radio
                  checked={type === 1}
                  onClick={this.handleClick(1)}
                  disabled={!products.length}
                />
              }
              label='Eduzz'
            />
            <FormControlLabel
              control={
                <Radio
                  checked={type === 2}
                  onClick={this.handleClick(2)}
                  disabled={!products.length}
                />
              }
              label='Nutror'
            />
            <div className={classes.selectContainer}>
              <Select
                className={classes.select}
                value={products.length ? content : ''}
                onChange={this.handleChange}
                displayEmpty
                IconComponent={products.length ? ArrowDropDownIcon : 'none'}
                disabled={!products.length}
              >
                <MenuItem value=''>
                  Selecione um Produto
                </MenuItem>
                {products.map((product: any, index: number) =>
                  <MenuItem
                    key={index}
                    value={product.hash}
                  >
                    {product.title}
                  </MenuItem>
                )}
              </Select>
              <FormHelperText className={classes.errorLabel}>Campo obrigatório</FormHelperText>
              {!products.length &&
                <div className={classes.progressContainer}>
                  <CircularProgress
                    size={25}
                    color='secondary'
                    className={classes.progress}
                  />
                </div>
              }
            </div>
          </div>
        </FormControl>
      </div>
    );
  }
}
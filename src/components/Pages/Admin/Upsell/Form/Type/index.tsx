import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import upsellService from 'services/upsell';
import rxjsOperators from 'rxjs-operators';

interface IProps {
  classes?: any;
  onChange?: any;
  type?: number;
  content?: string;
}

interface IState {
  type: number;
  content: string;
  products: any;
  selectedProductId: number;
}

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
    marginRight: 16,
  },
  content: {
    marginTop: 8,
  },
}))
export default class Type extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      type: 1,
      content: '',
      products: [],
      selectedProductId: 0,
    };

    upsellService.getProducts(this.state.type).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((products: any) => {
      this.setState({
        products,
      });
    });
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.type !== state.type || props.content !== state.content)
      return {
        type: props.type,
        content: props.content,
      };

    return null;
  }

  handleClick = (value: number) =>
    () => {
      this.setState({
        type: value,
      });

      upsellService.getProducts(value).pipe(
        rxjsOperators.logError(),
        rxjsOperators.bindComponent(this),
      ).subscribe((products: any) => {
        this.setState({
          products,
        });
      });
    }

  handleChange = (e: any) => {
    const { onChange } = this.props;

    this.setState({
      selectedProductId: e.target.value,
    });

    if (onChange) {
      onChange({
        product: e.target.value,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { type, products } = this.state;

    return (
      <div className={classes.root}>
        <FormControl fullWidth>
          <label className={classes.title}>
            Escolha um produto
          </label>
          <div className={classes.content}>
            <FormControlLabel
              control={
                <Radio
                  checked={type === 1}
                  onClick={this.handleClick(1)}
                />
              }
              label='Eduzz'
            />
            <FormControlLabel
              control={
                <Radio
                  checked={type === 2}
                  onClick={this.handleClick(2)}
                />
              }
              label='Nutror'
            />
            <Select
              className={classes.select}
              value={type}
              onChange={this.handleChange}
            >
              {products.map((product: any) =>
                <MenuItem
                  key={product.id}
                  value={product.id}
                >
                  {product.title}
                </MenuItem>
              )}
            </Select>
          </div>
        </FormControl>
      </div>
    );
  }
}
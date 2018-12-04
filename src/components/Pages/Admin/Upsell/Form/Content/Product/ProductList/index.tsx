import React, { PureComponent } from 'react';
import ProductItem from './ProductItem';
import List from '@material-ui/core/List';
import upsellService from 'services/upsell';
import rxjsOperators from 'rxjs-operators';
import Toast from 'components/Shared/Toast';
import { IUpsellProduct } from 'interfaces/models/upsell';
import { UpsellFormContext, IUpsellFormContext } from '../../../Context';
import Loading from 'components/Shared/Loading';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

interface IProps {
  classes?: any;
}

interface IState {
  products: IUpsellProduct[];
  search: string;
}

@WithStyles(theme => ({
  notFoundMessage: {
    border: '1px solid',
    borderColor: theme.variables.contentBorderColor,
    borderRadius: 4,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
}))
export default class ProductList extends PureComponent<IProps, IState> {
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      products: null,
      search: '',
    };
  }

  handleSearch = (e: any) => {
    this.setState({
      search: e.target.value,
    });
  }

  componentDidMount() {
    upsellService.getProducts(this.context.model.type).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(products => {
      this.setState({ products });
    }, error => Toast.error(error));
  }

  render() {
    const { classes } = this.props;
    const { products, search } = this.state;

    if (!products)
      return <Loading />;

    if (!products.length)
      return <Typography align='center' variant='subtitle1' className={classes.notFoundMessage}>Nenhum produto encontrado!</Typography>;

    return (
      <Grid container direction='column' spacing={8}>
        <Grid item>
          <TextField
            label='Pesquisar'
            fullWidth
            onChange={this.handleSearch}
          />
        </Grid>
        <Grid item>
          <List disablePadding>
            {products
              .filter(product => product.title.toLowerCase().includes(search.trim().toLowerCase()))
              .map((product, index) => (
                <ProductItem
                  key={index}
                  product={product}
                />
              ))
            }
          </List>
        </Grid>
      </Grid>
    );
  }
}
import React, { PureComponent } from 'react';
import ProductItem from './ProductItem';
import List from '@material-ui/core/List';
import upsellService from 'services/upsell';
import RxOp from 'rxjs-operators';
import { IUpsellProduct } from 'interfaces/models/upsell';
import { UpsellFormContext, IUpsellFormContext } from '../../../Context';
import Loading from 'components/Shared/Loading';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import ErrorMessage from 'components/Shared/ErrorMessage';

interface IProps {
  classes?: any;
}

interface IState {
  products: IUpsellProduct[];
  search: string;
  error?: any;
}

@WithStyles(theme => ({
  notFoundMessage: {
    border: '1px solid',
    borderColor: theme.variables.contentBorderColor,
    borderRadius: 4,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
  list: {
    height: 'calc(100vh - 458px)',
    overflow: 'auto',
    paddingRight: theme.spacing.unit,
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
      error: null,
    };
  }

  handleSearch = (e: any) => {
    this.setState({
      search: e.target.value,
    });
  }

  loadData = () => {
    this.setState({
      error: null,
    });

    upsellService.getProducts(this.context.model.type).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(products => {
      this.setState({ products });
    }, error => this.setState({ error }));
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { classes } = this.props;
    const { products, search, error } = this.state;

    if (error)
      return (
        <CardContent>
          <ErrorMessage error={error} tryAgain={this.loadData} />
        </CardContent>
      );

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
          <List className={classes.list} disablePadding>
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
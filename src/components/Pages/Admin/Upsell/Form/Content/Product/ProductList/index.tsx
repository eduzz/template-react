import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from 'components/Shared/ErrorMessage';
import Loading from 'components/Shared/Loading';
import { WithStyles } from 'decorators/withStyles';
import { IUpsellProduct } from 'interfaces/models/upsell';
import SearchIcon from 'mdi-react/SearchIcon';
import React, { PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import upsellService from 'services/upsell';

import { IUpsellFormContext, UpsellFormContext } from '../../../Context';
import ProductItem from './ProductItem';

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
  }
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
    this.setState({ search: e.target.value });
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
            placeholder='Pesquisar'
            fullWidth
            onChange={this.handleSearch}
            InputProps={{
              endAdornment: (
                <SearchIcon />
              )
            }}
          />
        </Grid>
        <Grid item>
          <List disablePadding>
            {products
              .filter(product => product.title.toLowerCase().includes(search.trim().toLowerCase()))
              .map((product) => (
                <ProductItem
                  key={product.content_id}
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
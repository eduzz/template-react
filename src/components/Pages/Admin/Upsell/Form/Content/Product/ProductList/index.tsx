import React, { PureComponent, Fragment } from 'react';
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

interface IProps {
  classes?: any;
}

interface IState {
  products: IUpsellProduct[];
}

@WithStyles(theme => ({
  notFoundMessage: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: (theme.spacing.unit * 2) + 4,
  },
}))
export default class ProductList extends PureComponent<IProps, IState> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      products: null,
    };
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
    const { products } = this.state;

    if (!products)
      return <Loading />;

    if (!products.length)
      return <Typography align='center' variant='subtitle1' className={classes.notFoundMessage}>Nenhum produto encontrado!</Typography>;

    return (
      <Fragment>
        <List disablePadding>
          {products.map((product, index) => (
            <ProductItem
              key={index}
              product={product}
            />
          ))}
        </List>
      </Fragment>
    );
  }
}
import React, { PureComponent, Fragment } from 'react';
import ProductItem from './ProductItem';
import List from '@material-ui/core/List';
import upsellService from 'services/upsell';
import rxjsOperators from 'rxjs-operators';
import Toast from 'components/Shared/Toast';
import { IUpsellProduct } from 'interfaces/models/upsell';
import { UpsellFormContext, IUpsellFormContext } from '../../../Context';
import Loading from 'components/Shared/Loading';

interface IProps {

}

interface IState {
  products: IUpsellProduct[];
}

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
    const { products } = this.state;

    if (!products)
      return <Loading />;

    return (
      <Fragment>
        <List disablePadding>
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
            />
          ))}
        </List>
      </Fragment>
    );
  }
}
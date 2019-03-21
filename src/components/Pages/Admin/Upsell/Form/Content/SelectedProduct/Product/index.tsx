import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Loading from 'components/Shared/Loading';
import { WithStyles } from 'decorators/withStyles';
import { IUpsellProduct } from 'interfaces/models/upsell';
import React, { PureComponent, SyntheticEvent } from 'react';

import { IUpsellFormContext, UpsellFormContext } from '../../../Context';

const nutrorLogo = require('assets/svg/nutror-logo.svg');

interface IProps {
  classes?: any;
  product: IUpsellProduct;
}

interface IState {
  product: IUpsellProduct;
}

@WithStyles(theme => ({
  root: {
    border: '1px solid',
    borderColor: theme.variables.contentBorderColor,
    borderRadius: 4,
    padding: theme.spacing.unit,
    margin: 0,
    width: '100%',
  },
  avatar: {
    width: 73,
    height: 73,
    borderRadius: 2,
  },
  price: {
    color: theme.palette.secondary.light,
  },
  button: {
    transition: 'all 0.3s ease',
    backgroundColor: '#596375',
    color: '#fff',
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
    '&:hover': {
      backgroundColor: '#596375',
      opacity: 0.7,
    },
  },
}))
export default class Product extends PureComponent<IProps, IState> {
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      product: {
        ...props.product,
        title: '',
        image: '',
      },
    };
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.product && props.product !== state.product)
      return { ...props };
    return null;
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    console.log(0);
    e.currentTarget.src = nutrorLogo;
  }

  handleClick = () => {
    this.context.updateModel(model => model.content_id = null)();
  }

  render() {
    const { classes } = this.props;
    const { product } = this.state;

    if (!product.title)
      return <Loading />;

    return (
      <Grid container className={classes.root} alignItems='center' spacing={16}>
        <Grid item>
          <Grid container>
            <img
              alt={product.title}
              className={classes.avatar}
              src={!!product.image ? product.image : ''}
              // src={CDN_URL + upsell.small_image}
              onError={this.handleImageError}
              height={44}
            />
          </Grid>
        </Grid>
        <Grid item xs={true}>
          <Typography variant='subtitle1'>{product.title}</Typography>
          {/* <Typography variant='subtitle1' noWrap className={classes.price}>R$ {product.price}</Typography> */}
        </Grid>
        <Grid item xs={false}>
          <Button variant='contained' className={classes.button} onClick={this.handleClick}>
            Redefinir produto
          </Button>
        </Grid>
      </Grid>
    );
  }
}
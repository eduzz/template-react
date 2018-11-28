import React, { PureComponent, SyntheticEvent, Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { IProduct } from 'interfaces/models/product';
import Typography from '@material-ui/core/Typography';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import ChevronUpIcon from 'mdi-react/ChevronUpIcon';
import { UpsellFormContext, IUpsellFormContext } from '../../../../Context';
import Collapse from '@material-ui/core/Collapse';
import ProductVariants from './ProductVariants';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import MinusCircleIcon from 'mdi-react/MinusCircleIcon';

const nutrorLogo = require('assets/svg/nutror-logo.svg');

interface IProps {
  classes?: any;
  product: IProduct;
}

interface IState {
  isVariantsOpen: boolean;
}

@WithStyles(theme => ({
  root: {
    border: '1px solid',
    borderColor: theme.variables.contentBorderColor,
    borderRadius: 4,
    padding: theme.spacing.unit,
    paddingLeft: 0,
    marginBottom: theme.spacing.unit,
    cursor: 'pointer',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 2,
  },
  icon: {
    fill: theme.palette.text.primary,
  },
  price: {
    color: theme.palette.secondary.light,
  },
  title: {
    color: '#8C9198',
  },
  checkboxContainer: {
    padding: theme.spacing.unit,
    '&:before': {
      content: '""',
      width: 13,
      height: 13,
      position: 'absolute',
      backgroundColor: theme.palette.primary.contrastText,
      top: 5,
      left: 5,
    },
  },
  checkbox: {
    transition: 'all 0.3s ease',
    fill: '#D9D9D9',
  },
  selected: {
    fill: '#009358',
  },
}))
export default class ProductItem extends PureComponent<IProps, IState> {
  static contextType: typeof UpsellFormContext = UpsellFormContext;
  context: IUpsellFormContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isVariantsOpen: false,
    };
  }

  handleSelectProduct = (content: string) => () => this.context.updateModel(model => model.content = content)();

  handleClick = () => {
    const { product } = this.props;
    const { updateModel } = this.context;

    if (!!product.variants && product.variants.length)
      this.setState(state => ({
        isVariantsOpen: !state.isVariantsOpen,
      }));
    else
      updateModel(model => model.content = (model.content !== product.content ? product.content : ''))();
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = nutrorLogo;
  }

  render() {
    const { classes, product } = this.props;
    const { isVariantsOpen } = this.state;
    const { model } = this.context;

    return (
      <Fragment>
        <ListItem className={classes.root} onClick={this.handleClick}>
          <Grid container direction='column'>
            <Grid item>
              <Grid container spacing={16} alignItems='center'>
                <Grid item>
                  <Grid container alignItems='center'>
                    <Grid item className={classes.checkboxContainer}>
                      {!!product.variants && product.variants.some(variant => variant.content === model.content) ?
                        <MinusCircleIcon
                          className={`${classes.checkbox} ${classes.selected}`}
                        />
                        :
                        <CheckCircleIcon
                          className={`${classes.checkbox} ${product.content === model.content && classes.selected}`}
                        />
                      }
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <img
                          alt=''
                          className={classes.avatar}
                          src={product.image}
                          // src={CDN_URL + upsell.small_image}
                          onError={this.handleImageError}
                          height={44}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={5}>
                  <Typography variant='subtitle2' className={classes.title} noWrap>{product.title}</Typography>
                </Grid>

                <Grid item xs={true}>
                  <Typography variant='subtitle1' noWrap className={classes.price}>
                    {!!product.variants && product.variants.length ?
                      `De R$ ${Math.min(...product.variants.map(variant => variant.price))} até R$ ${Math.max(...product.variants.map(variant => variant.price))}`
                      :
                      `R$ ${product.price}`
                    }
                  </Typography>
                </Grid>

                {!!product.variants &&
                  <Grid item xs={false}>
                    <Grid container>
                      <IconButton>
                        {isVariantsOpen ? <ChevronUpIcon className={classes.icon} /> : <ChevronDownIcon className={classes.icon} />}
                      </IconButton>
                    </Grid>
                  </Grid>
                }
              </Grid>
            </Grid>
            {!!product.variants &&
              <Grid item>
                <Collapse in={isVariantsOpen}>
                  <ProductVariants variants={product.variants} />
                </Collapse>
              </Grid>
            }
          </Grid>
        </ListItem>
      </Fragment>
    );
  }
}
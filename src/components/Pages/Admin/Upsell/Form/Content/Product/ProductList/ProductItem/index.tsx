import React, { PureComponent, SyntheticEvent, Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { IProduct } from 'interfaces/models/product';
import Typography from '@material-ui/core/Typography';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import { UpsellFormContext, IUpsellFormContext } from '../../../../Context';
import Radio from '@material-ui/core/Radio';
import Collapse from '@material-ui/core/Collapse';
import ProductVariants from './ProductVariants';

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
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 2,
  },
  icon: {
    fill: theme.palette.text.primary,
    marginRight: 8,
    width: 30,
  },
  price: {
    color: theme.palette.secondary.light,
  },
  title: {
    color: '#8C9198',
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

  handleRadioClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleTriggerVariants = () => {
    this.setState(state => ({
      isVariantsOpen: !state.isVariantsOpen,
    }));
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
        <ListItem className={classes.root} onClick={this.handleTriggerVariants}>
          <Grid container direction='column'>
            <Grid item>
              <Grid container spacing={16} alignItems='center'>
                <Grid item>
                  <Grid container alignItems='center'>
                    <Grid item>
                      <Radio
                        checked={model.content === product.content}
                        onChange={this.handleSelectProduct(product.content)}
                        onClick={this.handleRadioClick}
                      />
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

                <Grid item xs={6}>
                  <Typography variant='subtitle2' className={classes.title} noWrap>{product.title}</Typography>
                </Grid>

                <Grid item xs={true}>
                  <Typography variant='subtitle1' noWrap className={classes.price}>
                    R$ {product.price}
                  </Typography>
                </Grid>

                {!!product.variants &&
                  <Grid item xs={false}>
                    <Grid container>
                      <ChevronDownIcon className={classes.icon} />
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
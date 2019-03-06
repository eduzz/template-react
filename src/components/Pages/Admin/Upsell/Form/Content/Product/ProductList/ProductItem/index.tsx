import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { IUpsellProduct } from 'interfaces/models/upsell';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import ChevronUpIcon from 'mdi-react/ChevronUpIcon';
import MinusCircleIcon from 'mdi-react/MinusCircleIcon';
import React, { PureComponent, SyntheticEvent } from 'react';

import { IUpsellFormContext, UpsellFormContext } from '../../../../Context';
import ProductVariants from './ProductVariants';

const nutrorLogo = require('assets/svg/nutror-logo.svg');

interface IProps {
  classes?: any;
  product: IUpsellProduct;
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
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isVariantsOpen: false,
    };
  }

  componentDidMount() {
    if (this.isSomeVariantSelected())
      this.setState({
        isVariantsOpen: true,
      });
  }

  handleSelectProduct = (content_id: string) => () => this.context.updateModel(model => model.pre_content_id = content_id)();

  handleClick = () => {
    const { product } = this.props;
    const { updateModel } = this.context;

    if (!!product.children && product.children.length)
      this.setState(state => ({
        isVariantsOpen: !state.isVariantsOpen,
      }));
    else
      updateModel(model => model.pre_content_id = (model.pre_content_id !== product.content_id ? product.content_id : null))();
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = nutrorLogo;
  }

  isSomeVariantSelected = () => {
    const { product } = this.props;

    return !!product.children && product.children.some(variant => variant.content_id === this.context.model.pre_content_id);
  }

  render() {
    const { classes, product } = this.props;
    const { isVariantsOpen } = this.state;
    const { model } = this.context;

    return (
      <ListItem className={classes.root} onClick={this.handleClick}>
        <Grid container direction='column'>
          <Grid item>
            <Grid container spacing={16} alignItems='center'>
              <Grid item>
                <Grid container alignItems='center'>
                  <Grid id={`escolheProduto${(product.title).replace(/ /g,'')}`} item className={classes.checkboxContainer}>
                    {this.isSomeVariantSelected() ?
                      <MinusCircleIcon
                        className={`${classes.checkbox} ${classes.selected}`}
                      />
                      :
                      <CheckCircleIcon
                        className={`${classes.checkbox} ${product.content_id === model.pre_content_id && classes.selected}`}
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

              <Grid item xs={true}>
                <Typography variant='subtitle2' className={classes.title} noWrap>{product.title}</Typography>
              </Grid>

              {!!product.children && !!product.children.length &&
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
          {!!product.children && !!product.children.length &&
            <Grid item>
              <Collapse in={isVariantsOpen}>
                <ProductVariants variants={product.children} />
              </Collapse>
            </Grid>
          }
        </Grid>
      </ListItem>
    );
  }
}
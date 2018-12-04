import React, { PureComponent, SyntheticEvent } from 'react';
import { WithStyles } from 'decorators/withStyles';
import { IUpsellProductVariant } from 'interfaces/models/upsell';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { UpsellFormContext, IUpsellFormContext } from 'components/Pages/Admin/Upsell/Form/Context';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';

interface IProps {
  classes?: any;
  variant: IUpsellProductVariant;
}

@WithStyles(theme => ({
  root: {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: 8,
    width: 180,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  image: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  price: {
    color: theme.palette.secondary.light,
  },
  imageContainer: {
    position: 'relative',
    '&:before': {
      content: '""',
      width: 13,
      height: 13,
      position: 'absolute',
      backgroundColor: theme.palette.primary.contrastText,
      top: 11,
      left: 11,
    },
  },
  checkbox: {
    transition: 'all 0.3s ease',
    position: 'absolute',
    fill: '#D9D9D9',
    margin: theme.spacing.unit - 2,
  },
  selected: {
    fill: '#009358',
  },
}))
export default class Variant extends PureComponent<IProps> {
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

  handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();

    const { variant } = this.props;
    const { updateModel } = this.context;

    updateModel(model => model.pre_content_id = (model.pre_content_id !== variant.content_id ? variant.content_id : null))();
  }

  render() {
    const { classes, variant } = this.props;
    const { model } = this.context;

    return (
      <Grid container wrap='nowrap' className={classes.root} onClick={this.handleClick}>
        <Grid item>
          <Grid container className={classes.imageContainer}>
            <CheckCircleIcon
              className={`${classes.checkbox} ${variant.content_id === model.pre_content_id && classes.selected}`}
            />
            <img alt='' src={variant.image} className={classes.image} />
          </Grid>
        </Grid>
        <Grid item className={classes.content}>
          <Typography variant='caption'>{variant.title}</Typography>
          {/* <Typography variant='subtitle2' className={classes.price}>R$ {variant.price}</Typography> */}
        </Grid>
      </Grid>
    );
  }
}
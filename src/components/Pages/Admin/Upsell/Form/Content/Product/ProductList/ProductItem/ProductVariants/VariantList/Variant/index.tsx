import React, { PureComponent } from 'react';
import { WithStyles } from 'decorators/withStyles';
import { IVariant } from 'interfaces/models/product';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface IProps {
  classes?: any;
  variant: IVariant;
}

@WithStyles(theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
    padding: 8,
  },
  image: {
    width: 150,
    height: 150,
  },
  price: {
    color: theme.palette.secondary.light,
  },
}))
export default class Variant extends PureComponent<IProps> {
  render() {
    const { classes, variant } = this.props;

    return (
      <Grid container wrap='nowrap'>
        <Grid item>
          <Grid container>
            <img alt='' src={variant.image} className={classes.image} />
          </Grid>
        </Grid>
        <Grid item className={classes.content}>
          <Typography variant='caption'>{variant.title}</Typography>
          <Typography variant='subtitle2' className={classes.price}>R$ {variant.price}</Typography>
        </Grid>
      </Grid>
    );
  }
}
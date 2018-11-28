import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { IVariant } from 'interfaces/models/product';
import VariantList from './VariantList';

interface IProps {
  classes?: any;
  variants: IVariant[];
}

@WithStyles(theme => ({
  root: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
}))
export default class ProductVariants extends PureComponent<IProps> {
  render() {
    const { classes, variants } = this.props;

    return (
      <Grid container className={classes.root} direction='column' spacing={16}>
        <Grid item>
          <Grid container alignItems='center' spacing={16}>
            <Grid item>
              <Typography variant='caption'>
                <strong>Variações</strong>
              </Typography>
            </Grid>
            <Grid item xs={true}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <VariantList variants={variants} />
        </Grid>
      </Grid>
    );
  }
}
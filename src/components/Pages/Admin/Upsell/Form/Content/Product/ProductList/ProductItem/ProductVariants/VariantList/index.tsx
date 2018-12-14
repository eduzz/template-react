import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { IUpsellProductVariant } from 'interfaces/models/upsell';
import Variant from './Variant';

interface IProps {
  variants: IUpsellProductVariant[];
}

export default class VariantList extends PureComponent<IProps> {
  render() {
    const { variants } = this.props;

    return (
      <Grid container spacing={16}>
        {variants.map((variant, index) =>
          <Grid item key={index}>
            <Variant variant={variant} />
          </Grid>
        )}
      </Grid>
    );
  }
}
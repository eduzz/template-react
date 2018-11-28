import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { IVariant } from 'interfaces/models/product';
import Variant from './Variant';

interface IProps {
  variants: IVariant[];
}

export default class VariantList extends PureComponent<IProps> {
  render() {
    const { variants } = this.props;

    return (
      <Grid container spacing={16}>
        {variants.map(variant =>
          <Grid item key={variant.id}>
            <Variant variant={variant} />
          </Grid>
        )}
      </Grid>
    );
  }
}
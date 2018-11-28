import React, { PureComponent, SyntheticEvent } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { UpsellFormContext, IUpsellFormContext } from '../../Context';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ProductList from './ProductList';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  changeLink: {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
  },
}))
export default class Product extends PureComponent<IProps> {
  static contextType: typeof UpsellFormContext = UpsellFormContext;
  context: IUpsellFormContext;

  handleCleanType = (e: SyntheticEvent) => {
    e.preventDefault();

    this.context.updateModel(model => model.type = null)();
  }

  render() {
    const { classes } = this.props;

    return (
      <CardContent>
        <Grid container direction='column' spacing={24}>
          <Grid item>
            <Typography variant='subtitle1'>
              <strong>Tipo Selecionado:</strong> Infoproduto <a className={classes.changeLink} href='' onClick={this.handleCleanType}>(Trocar)</a>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>
              <strong>Lista de Produtos</strong>
            </Typography>
            <Typography variant='caption'>Selecione um produto para ofertar</Typography>
          </Grid>
          <Grid item>
            <Grid container direction='column' spacing={8}>
              <Grid item>
                <TextField
                  label='Pesquisar'
                  fullWidth
                />
              </Grid>
              <Grid item>
                <ProductList />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}
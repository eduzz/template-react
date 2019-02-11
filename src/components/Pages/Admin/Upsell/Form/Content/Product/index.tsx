import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent, SyntheticEvent } from 'react';

import { IUpsellFormContext, UpsellFormContext } from '../../Context';
import ProductList from './ProductList';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  changeLink: {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
  },
  button: {
    float: 'right',
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
  },
}))
export default class Product extends PureComponent<IProps> {
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

  handleCleanType = (e: SyntheticEvent) => {
    e.preventDefault();
    this.context.updateModel(model => model.type = null)();
  }

  handleSubmitContent = () => this.context.updateModel(model => model.content_id = model.pre_content_id)();

  getNameProductType = (type: number) => {
    switch (type) {
      case 1:
        return 'Infoproduto ';
      case 3:
        return 'Produto Físico ';
      default:
        return '';
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <CardContent>
        <Grid container direction='column' spacing={24} wrap='nowrap'>
          <Grid item>
            <Typography id='txtTipoSelecionado' variant='subtitle1'>
              <strong>Tipo Selecionado:</strong> {this.getNameProductType(this.context.model.type)}
              <a className={classes.changeLink} href='' onClick={this.handleCleanType}>(Trocar)</a>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>
              <strong>Lista de Produtos</strong>
            </Typography>
            <Typography variant='caption'>Selecione um produto para ofertar</Typography>
          </Grid>
          <Grid item xs={true}>
            <ProductList />
          </Grid>
          <Grid item xs={false}>
            <Button
              id='buttonSelecionarProduto'
              className={classes.button}
              onClick={this.handleSubmitContent}
              variant='contained'
              color='secondary'
            >
              Selecionar Produto
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}
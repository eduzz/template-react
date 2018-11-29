import React, { PureComponent } from 'react';
import Fade from '@material-ui/core/Fade';
import CardContent from '@material-ui/core/CardContent';
import { WithStyles } from 'decorators/withStyles';
import { UpsellFormContext, IUpsellFormContext } from '../../Context';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Product from './Product';
import { IProduct } from 'interfaces/models/product';
import Button from '@material-ui/core/Button';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    position: 'relative',
  },
  content: {
    background: '#fff',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
  },
  messageContainer: {
    paddingTop: 125,
  },
  messageDescription: {
    maxWidth: 230,
  },
  messageButton: {
    marginTop: theme.spacing.unit,
  },
}))
export default class SelectedProduct extends PureComponent<IProps> {
  static contextType: typeof UpsellFormContext = UpsellFormContext;
  context: IUpsellFormContext;

  private product: IProduct = {
    id: 2,
    title: '09987 - Design Sprint Google Ventures',
    image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/2.png',
    price: 46,
    content: 'b',
  }; // MOCK

  render() {
    const { classes } = this.props;
    const { model } = this.context;

    return (
      <div className={classes.root}>
        <Fade in={!!model.content}>
          <CardContent className={classes.content}>
            <Grid container direction='column' spacing={16}>
              <Grid item>
                <Typography variant='subtitle1'>
                  <strong>Produto Selecionado:</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Product product={this.product} />
              </Grid>
              <Grid item>
                <Grid container spacing={8} alignItems='center' direction='column' className={classes.messageContainer}>
                  <Grid item>
                    <Typography variant='subtitle1' align='center' gutterBottom>
                      <strong>Muito Bem! Escolhemos nosso produto</strong>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle1' align='center' className={classes.messageDescription}>
                      Estamos prontos para inserir os dados e preparar a oferta
                  </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant='contained' color='secondary' className={classes.messageButton}>
                      Ir para Informações
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Fade>
      </div>
    );
  }
}
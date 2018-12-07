import React, { PureComponent } from 'react';
import CardContent from '@material-ui/core/CardContent';
import { WithStyles } from 'decorators/withStyles';
import { UpsellFormContext, IUpsellFormContext } from '../../Context';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Product from './Product';
import Button from '@material-ui/core/Button';
import { IUpsellProduct } from 'interfaces/models/upsell';
import upsellService from 'services/upsell';
import Toast from 'components/Shared/Toast';
import rxjsOperators from 'rxjs-operators';

interface IProps {
  classes?: any;
}

interface IState {
  selectedProduct: IUpsellProduct;
}

@WithStyles(theme => ({
  root: {
    background: '#fff',
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
export default class SelectedProduct extends PureComponent<IProps, IState> {
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedProduct: null,
    };
  }

  componentDidMount() {
    const { model } = this.context;

    upsellService.getProducts(model.type).pipe(
      rxjsOperators.bindComponent(this),
      rxjsOperators.logError(),
    ).subscribe(products => {
      if (products)
        this.setState({
          selectedProduct: products
            .reduce((acc, item) => [...acc, { ...item }, ...(item.children || [])], [])
            .find(p => p.content_id == model.content_id),
        });
    }, error => {
      Toast.error(error);
    });
  }

  handleInformations = () => {
    this.context.updateFlowStep(1);
  }

  render() {
    const { classes } = this.props;
    const { selectedProduct } = this.state;

    return (
      <CardContent className={classes.root}>
        <Grid container direction='column' spacing={16}>
          <Grid item>
            <Typography variant='subtitle1'>
              <strong>Produto Selecionado:</strong>
            </Typography>
          </Grid>
          <Grid item>
            <Product product={selectedProduct} />
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
                <Button variant='contained' color='secondary' className={classes.messageButton} onClick={this.handleInformations}>
                  Ir para Informações
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}
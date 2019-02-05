import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

import { IUpsellFormContext, UpsellFormContext } from '../../Context';

const infoProduto = require('assets/images/info-produto.png');
const produtoFisico = require('assets/images/produto-fisico.png');

interface IType {
  value: number;
  title: string;
  description: string;
  svg: string;
}

interface IProps {
  classes?: any;
}

interface IState {
  selectedType: number;
}

@WithStyles(theme => ({
  root: {
    paddingTop: theme.spacing.unit * 6,
    background: '#fff',
  },
  messageDescription: {
    maxWidth: 470,
    lineHeight: 1.3,
    paddingBottom: 24,
  },
  typeItem: {
    transition: 'all 0.3s ease',
    border: '1px solid',
    borderColor: '#D8D8D8',
    borderRadius: 4,
    cursor: 'pointer',
    padding: theme.spacing.unit * 4,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  selectedType: {
    border: '2px solid',
    borderColor: '#009358',
    padding: (theme.spacing.unit * 4) - 1,
  },
  typeSvg: {
    width: 63,
    marginBottom: theme.spacing.unit * 5,
  },
  typeDescription: {
    maxWidth: 200,
  },
  button: {
    marginTop: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
  },
}))
export default class ProductType extends PureComponent<IProps, IState> {
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

  private types: IType[] = [
    {
      value: 1,
      title: 'Infoproduto',
      description: 'Apostilas, planilhas, e-books, seus produtos digitais',
      svg: infoProduto,
    },
    {
      value: 3,
      title: 'Produto Físico',
      description: 'Livros, Peças, brindes, camisetas, tenis',
      svg: produtoFisico,
    },
  ];

  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedType: null,
    };
  }

  componentDidUpdate() {
    const { type } = this.context.model;

    if (type && type !== this.state.selectedType)
      this.setState({
        selectedType: type,
      });
  }

  handleSelectType = (type: number) => () => this.setState({ selectedType: type });

  handleSubmitSelectType = () => {
    const { selectedType } = this.state;

    // if (upsellService.getCurrentProductType() !== selectedType)
    //   upsellService.loadProducts(selectedType);

    this.context.updateModel(model => model.type = selectedType)();
  }

  render() {
    const { classes } = this.props;
    const { selectedType } = this.state;

    return (
      <CardContent className={classes.root}>
        <Grid container spacing={8} alignItems='center' direction='column'>
          <Grid item>
            <Typography id='textoIntroducao' variant='h4' align='center'>
              Oba! Vamos escolher qual produto vamos vender!
                </Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' align='center' className={classes.messageDescription}>
              Para iniciar a configuração é necessário escolher qual o produto que vamos promover, vamos iniciar escolhendo um tipo de produto.
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={16} justify='center'>
              {this.types.map(type =>
                <Grid item key={type.value}>
                  <div
                    id={`tipo${(type.title).replace(' ','')}`}
                    className={`${classes.typeItem} ${selectedType === type.value && classes.selectedType}`}
                    onClick={this.handleSelectType(type.value)}
                  >
                    <img className={classes.typeSvg} alt='' src={type.svg} />
                    <Typography align='center' variant='h6' gutterBottom>{type.title}</Typography>
                    <Typography align='center' variant='subtitle1' className={classes.typeDescription}>{type.description}</Typography>
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Button
              id='buttonIniciarOferta'
              className={classes.button}
              onClick={this.handleSubmitSelectType}
              variant='contained'
              color='secondary'
            >
              Iniciar Oferta
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}
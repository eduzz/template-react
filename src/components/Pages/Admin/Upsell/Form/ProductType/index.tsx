import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import Button from '@material-ui/core/Button';
import { FormContext } from '..';
import { IUpsell } from 'interfaces/models/upsell';

const nutrorLogo = require('assets/svg/nutror-logo.svg');

interface IType {
  value: number;
  title: string;
  description: string;
  svg: string;
}

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    paddingTop: theme.spacing.unit * 6,
  },
  messageDescription: {
    maxWidth: 470,
    lineHeight: 1.3,
    paddingBottom: 24,
  },
  typeItem: {
    transition: 'all 0.3s ease',
    border: '1px solid',
    borderColor: theme.variables.contentBorderColor,
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
    borderColor: theme.palette.secondary.main,
    padding: (theme.spacing.unit * 4) - 1,
  },
  typeSvg: {
    width: 62,
    height: 62,
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
export default class ProductType extends Component<IProps> {
  static contextType: typeof FormContext = FormContext;

  private types: IType[] = [
    {
      value: 1,
      title: 'Curso do Nutror',
      description: 'Cursos dentro da plataforma nutror que deseja ofertar.',
      svg: nutrorLogo,
    },
    {
      value: 2,
      title: 'Infoproduto',
      description: 'Apostilas, planilhas, e-books, seus produtos digitais',
      svg: nutrorLogo,
    },
    {
      value: 2,
      title: 'Produto Físico',
      description: 'Livros, Peças, brindes, camisetas, tenis',
      svg: nutrorLogo,
    },
    {
      value: 3,
      title: 'Serviço',
      description: 'Serviços que podem ser prestados através da plataforma Jobzz',
      svg: nutrorLogo,
    },
  ];

  handleSelectType = (index: number) => () => this.context.updateModel((model: IUpsell) => model.type = index);

  render() {
    const { classes } = this.props;

    let { model } = this.context;

    return (
      <FormContext.Consumer>
        {(context: any) => {
          console.log(context);

          return (
            <div className={classes.root}>
              <Grid container spacing={8} alignItems='center' direction='column'>
                <Grid item>
                  <Typography variant='h4' align='center'>
                    Oba! Vamos escolher qual produto vamos vender!
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle1' align='center' className={classes.messageDescription}>
                    Percebemos que não temos um produto específico para vender, vamos iniciar escolhendo um tipo de produto
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={16} justify='center'>
                    {this.types.map(type =>
                      <Grid item key={type.value}>
                        <div
                          className={`${classes.typeItem} ${model.type === type.value && classes.selectedType}`}
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
                  <Button variant='contained' color='secondary' className={classes.button}>
                    Iniciar Oferta
                  </Button>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </FormContext.Consumer>
    );
  }
}
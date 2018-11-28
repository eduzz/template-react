import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import Button from '@material-ui/core/Button';

import { UpsellFormContext, IUpsellFormContext } from '../../Context';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';

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

interface IState {
  selected: number;
}

@WithStyles(theme => ({
  root: {
    position: 'relative',
  },
  content: {
    paddingTop: theme.spacing.unit * 6,
    background: '#fff',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
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
export default class ProductType extends PureComponent<IProps, IState> {
  static contextType: typeof UpsellFormContext = UpsellFormContext;
  context: IUpsellFormContext;

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
      value: 3,
      title: 'Produto Físico',
      description: 'Livros, Peças, brindes, camisetas, tenis',
      svg: nutrorLogo,
    },
    {
      value: 4,
      title: 'Serviço',
      description: 'Serviços que podem ser prestados através da plataforma Jobzz',
      svg: nutrorLogo,
    },
  ];

  constructor(props: IProps) {
    super(props);

    this.state = {
      selected: null,
    };
  }

  componentDidMount() {
    this.setState({
      selected: this.context.model.type,
    });
  }

  handleSelectType = (type: number) => () => this.setState({ selected: type });

  handleSubmitSelectType = () => this.context.updateModel(model => model.type = this.state.selected)();

  render() {
    const { classes } = this.props;
    const { selected } = this.state;
    const { model } = this.context;

    return (
      <div className={classes.root}>
        <Fade in={!model.type}>
          <CardContent className={classes.content}>
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
                        className={`${classes.typeItem} ${selected === type.value && classes.selectedType}`}
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
                <Button variant='contained' color='secondary' className={classes.button} onClick={this.handleSubmitSelectType}>
                  Iniciar Oferta
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Fade>
      </div>
    );
  }
}
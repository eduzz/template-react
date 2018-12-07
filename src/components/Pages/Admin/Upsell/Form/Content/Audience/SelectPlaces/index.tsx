import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';

const destaqueVitrine = require('assets/images/destaque-vitrine.png');
const cardVitrine = require('assets/images/card-vitrine.png');
const curso = require('assets/images/curso.png');
const aula = require('assets/images/aula.png');

interface IPlace {
  value: number;
  title: string;
  description: string;
  image: string;
}

interface IProps {
  classes?: any;
}

interface IState {
  selectedPlace: number;
}

@WithStyles(theme => ({
  messageDescription: {
    maxWidth: 470,
    lineHeight: 1.3,
    paddingBottom: 24,
  },
  item: {
    transition: 'all 0.3s ease',
    border: '1px solid',
    borderColor: '#D8D8D8',
    borderRadius: 4,
    cursor: 'pointer',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  selectedPlace: {
    border: '2px solid',
    borderColor: '#009358',
    paddingTop: (theme.spacing.unit * 2) - 1,
    paddingBottom: (theme.spacing.unit * 2) - 1,
    paddingRight: (theme.spacing.unit * 3) - 1,
    paddingLeft: (theme.spacing.unit * 3) - 1,
  },
  image: {
    height: 116,
    width: 195,
    marginBottom: theme.spacing.unit * 2,
  },
  description: {
    maxWidth: 170,
  },
}))
export default class ProductType extends PureComponent<IProps, IState> {

  private places: IPlace[] = [
    {
      value: 1,
      title: 'Destaque da Vitrine',
      description: 'É exibido na página inicial da sua área de membros.',
      image: destaqueVitrine,
    },
    {
      value: 2,
      title: 'Card da Vitrine',
      description: 'Será exibida na prateleira de ofertas na página inicial da sua área de membros.',
      image: cardVitrine,
    },
    {
      value: 3,
      title: 'Miniatura na tela de Curso',
      description: 'Exibe no card de oferta na página de curso.',
      image: curso,
    },
    {
      value: 4,
      title: 'Miniatura na tela de Aula',
      description: 'Serviços que podem ser prestados através da plataforma Jobzz',
      image: aula,
    },
  ];

  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedPlace: null,
    };
  }

  handleSelectPlace = (place: number) => () => this.setState({ selectedPlace: place });

  render() {
    const { classes } = this.props;
    const { selectedPlace } = this.state;

    return (
      <Grid container spacing={16}>
        {this.places.map(place =>
          <Grid item key={place.value}>
            <div
              className={`${classes.item} ${selectedPlace === place.value && classes.selectedPlace}`}
              onClick={this.handleSelectPlace(place.value)}
            >
              <img className={classes.image} alt='' src={place.image} />
              <Typography align='center' variant='subtitle1' gutterBottom><strong>{place.title}</strong></Typography>
              <Typography align='center' variant='caption' className={classes.description}>{place.description}</Typography>
            </div>
          </Grid>
        )}
      </Grid>
    );
  }
}
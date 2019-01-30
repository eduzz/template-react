import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FieldHidden from '@react-form-fields/material-ui/components/Hidden';
import { WithStyles } from 'decorators/withStyles';
import React, { Fragment, PureComponent } from 'react';

import { IUpsellFormContext, UpsellFormContext } from '../../../Context';

const destaqueVitrine = require('assets/images/destaque-vitrine.png');
const cardVitrine = require('assets/images/card-vitrine.png');
const curso = require('assets/images/curso.png');
const aula = require('assets/images/aula.png');

interface IPlace {
  value: number;
  title: string;
  description: string;
  image: string;
  selectedLabel: string;
  handleClick?: () => void;
}

interface IProps {
  classes?: any;
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
export default class ProductType extends PureComponent<IProps> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

  private places: IPlace[] = [
    {
      value: 1,
      title: 'Destaque da Vitrine',
      description: 'É exibido na página inicial da sua área de membros.',
      image: destaqueVitrine,
      selectedLabel: 'highlight',
      handleClick: () => {
        this.context.updateModel(model => model.highlight = !model.highlight)();
      },
    },
    {
      value: 2,
      title: 'Card da Vitrine',
      description: 'Será exibida na prateleira de ofertas na página inicial da sua área de membros.',
      image: cardVitrine,
      selectedLabel: 'offer_shelf',
      handleClick: () => {
        this.context.updateModel(model => model.offer_shelf = !model.offer_shelf)();
      },
    },
    {
      value: 3,
      title: 'Miniatura na tela de Curso',
      description: 'É exibido dentro da página de curso na lateral.',
      image: curso,
      selectedLabel: 'has_selected_courses',
      handleClick: () => {
        this.context.updateModel(model => model.has_selected_courses = !model.has_selected_courses)();
      },
    },
    {
      value: 4,
      title: 'Miniatura na tela de Aula',
      description: 'A oferta é exibida dentro de uma aula.',
      image: aula,
      selectedLabel: 'has_selected_lessons',
      handleClick: () => {
        this.context.updateModel(model => model.has_selected_lessons = !model.has_selected_lessons)();
      },
    },
  ];

  render() {
    const { classes } = this.props;
    const { model } = this.context;

    return (
      <Fragment>
        <FieldHidden
          value={!model.highlight && !model.offer_shelf && !model.has_selected_courses && !model.has_selected_lessons ? null : 'OK'}
          validation='required'
        />

        <Grid container spacing={16}>
          {this.places.map(place =>
            <Grid item key={place.value}>
              <div
                className={`${classes.item} ${!!model[place.selectedLabel] && classes.selectedPlace}`}
                onClick={place.handleClick}
              >
                <img className={classes.image} alt='' src={place.image} />
                <Typography align='center' variant='subtitle1' gutterBottom><strong>{place.title}</strong></Typography>
                <Typography align='center' variant='caption' className={classes.description}>{place.description}</Typography>
              </div>
            </Grid>
          )}
        </Grid>
      </Fragment>
    );
  }
}
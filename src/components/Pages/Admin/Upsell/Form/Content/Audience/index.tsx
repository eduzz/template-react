import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

import { IUpsellFormContext, UpsellFormContext } from '../../Context';
import CourseList from './CourseList';
import SelectPlaces from './SelectPlaces';

interface IProps {
  classes?: any;
}

@WithStyles({
  list: {
    transition: 'all 0.3s ease',
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
})
export default class Audience extends PureComponent<IProps> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

  render() {
    const { model } = this.context;
    const { classes } = this.props;

    return (
      <CardContent>
        <Grid container direction='column' spacing={32} wrap='nowrap'>
          <Grid item>
            <Typography variant='subtitle1'>
              <strong>Audiência</strong>
            </Typography>
            <Typography variant='caption'>Insira as informações para definir como será sua oferta,  é muito importante que seja um texto coeso e de fácil entendimento.</Typography>
          </Grid>
          <Grid item>
            <SelectPlaces />
          </Grid>
          <Grid item className={`${classes.list} ${(!model.has_selected_courses && !model.has_selected_lessons) && classes.disabled}`}>
            <Typography variant='subtitle1'>
              <strong>Aulas a exibir</strong>
            </Typography>
            <Typography variant='caption' gutterBottom>Selecione as aulas em que deseja mostrar a Oferta</Typography>

            <CourseList />
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}
import React, { PureComponent } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { WithStyles } from 'decorators/withStyles';
import SelectPlaces from './SelectPlaces';
import CourseList from './CourseList';

interface IProps {
  classes?: any;
}

@WithStyles({

})
export default class Informations extends PureComponent<IProps> {

  render() {
    // const { classes } = this.props;

    return (
      <CardContent>
        <Grid container direction='column' spacing={32}>
          <Grid item>
            <Typography variant='subtitle1'>
              <strong>Audiência</strong>
            </Typography>
            <Typography variant='caption'>Insira as informações para definir como será sua oferta,  é muito importante que seja um texto coeso e de fácil entendimento.</Typography>
          </Grid>
          <Grid item>
            <SelectPlaces />
          </Grid>
          <Grid item>
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
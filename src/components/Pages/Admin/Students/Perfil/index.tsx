import React, { PureComponent, Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';
import FileDocumentIcon from 'mdi-react/FileDocumentIcon';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from 'components/Layout/Toolbar';
import Info from './Info';
import Divider from '@material-ui/core/Divider';
import CourseList from './CourseList';
import ActivityList from './ActivityList';
import Button from '@material-ui/core/Button';

interface IProps {
  classes?: any;
}
@WithStyles(theme => ({
  icon: {
    fill: theme.palette.text.primary,
  },
  card: {
    minHeight: 0,
  },
}))
export default class Perfil extends PureComponent<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar>
          <Grid container spacing={8} alignItems='center'>
            <Grid item>
              <FileDocumentIcon className={classes.icon} />
            </Grid>
            <Grid item>
              <Typography variant='h6'>Perfil do Aluno</Typography>
            </Grid>
          </Grid>
        </Toolbar>

        <Grid container direction='column' wrap='nowrap' spacing={24}>
          <Grid item>
            <Card className={classes.card}>
              <CardContent>
                <Info />
              </CardContent>
              <CardContent>
                <Divider />
              </CardContent>
              <CardContent>
                <Typography variant='h6'>
                  <strong>Cursos Matriculados</strong>
                </Typography>
                <CourseList />
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardContent>
                <Grid container spacing={16} direction='column'>
                  <Grid item>
                    <Grid container>
                      <Grid item xs={true}>
                        <Typography variant='h6'>
                          <strong>Histórico de Atividades</strong>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button variant='contained' color='secondary'>Exportar Resultados</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ActivityList />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
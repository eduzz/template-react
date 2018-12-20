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

        <Card className={classes.card}>
          <CardContent>
            <Info />
          </CardContent>
          <CardContent>
            <Divider />
          </CardContent>
          <CardContent>
            <Typography variant='subtitle1'>
              <strong>Cursos Matriculados</strong>
            </Typography>
            <CourseList />
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}
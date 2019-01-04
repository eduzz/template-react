import React, { PureComponent, Fragment } from 'react';
import Toolbar from 'components/Layout/Toolbar';
import Grid from '@material-ui/core/Grid';
import FileDocumentIcon from 'mdi-react/FileDocumentIcon';
import { WithStyles } from 'decorators/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Filters from './Filters';
import StudentList from './StudentList';
import Divider from '@material-ui/core/Divider';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  icon: {
    fill: theme.palette.text.primary,
  },
}))
export default class List extends PureComponent<IProps> {
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
              <Typography variant='h6'>Acompanhamento de Alunos</Typography>
            </Grid>
          </Grid>
        </Toolbar>

        <Card>
          <CardContent>
            <Grid container direction='column' spacing={24}>
              <Grid item>
                <Typography variant='subtitle1'>
                  <strong>Lista de Alunos</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Filters />
              </Grid>
              <Grid item>
                <Divider />
              </Grid>
              <Grid item>
                <StudentList />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}
import React from 'react';
import Form from './Form';
import Toolbar from 'components/Layout/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { WithStyles } from 'decorators/withStyles';
import List from './List';
import Typography from '@material-ui/core/Typography';

interface IProps {
  classes?: any;
}

@WithStyles({
  container: {
    padding: 16,
  },
})
export default class CategoriesIndexPage extends React.PureComponent<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Toolbar>
          <Grid container spacing={8} alignItems='center'>
            <Grid item>
              <Typography variant='h6'>Categorias</Typography>
            </Grid>
          </Grid>
        </Toolbar>

        <Grid container justify='center'>
          <Grid item xs={12} lg={10}>
            <Paper className={classes.container}>
              <Form />
              <List />
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
import React, { Fragment } from 'react';
import Toolbar from 'components/Layout/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { WithStyles } from 'decorators/withStyles';
import Button from '@material-ui/core/Button';
import Type from './Type';
import Form from './Form';
import TreeView from './TreeView';

interface IProps {
  classes?: any;
}

interface IState {
  type: any;
}

@WithStyles(theme => ({
  container: {
    padding: 16,
    // maxWidth: 1000,
  },
  section: {
    paddingBottom: 24,
  },
  treeViewLabel: {
    fontSize: 18,
  },
  treeViewContainer: {
    padding: 16,
    marginTop: 16,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#009358',
    height: 40,
    width: 120,
  },
}))
export default class Upsell extends React.PureComponent<IProps, IState> {
  handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(this.state);
  }

  handleChange = (state: any) => {
    this.setState(state);
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title='Upsell' />

        <Grid container justify='center'>
          <Grid item xs={12} lg={10}>
            <Paper className={classes.container}>
              <form onSubmit={this.handleSubmit}>
                <Grid container>
                  <Grid item xs={12} className={classes.section}>
                    <Type onChange={this.handleChange} />
                  </Grid>
                  <Grid item xs={12} className={classes.section}>
                    <Form onChange={this.handleChange} />
                  </Grid>
                  <Grid item xs={12} className={classes.section}>
                    <label className={classes.treeViewLabel}>
                      Onde você quer aplicar?
                    </label>
                    <Paper className={classes.treeViewContainer}>
                      <TreeView onChange={this.handleChange} />
                    </Paper>
                  </Grid>
                </Grid>
                <div className={classes.actions}>
                  <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    type='submit'
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
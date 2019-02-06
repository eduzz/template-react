import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { WithStyles } from 'decorators/withStyles';
import React, { Fragment, PureComponent } from 'react';

import { IUpsellFormContext, UpsellFormContext } from '../../Context';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
  },
}))
export default class ActionButtons extends PureComponent<IProps> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

  handleNext = () => {
    this.context.updateFlowStep(this.context.flowStep + 1);
  }

  handlePrevious = () => {
    this.context.updateFlowStep(this.context.flowStep - 1);
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Divider />
        <Grid container className={classes.root}>
          <Grid item xs={true}>
            <Button variant='outlined' color='secondary' onClick={this.handlePrevious}>
              Anterior
          </Button>
          </Grid>
          <Grid item xs='auto'>
            <Button id='proximo' variant='contained' color='secondary' onClick={this.handleNext}>
              Próximo
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
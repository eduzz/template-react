import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import { WithStyles } from 'decorators/withStyles';
import { UpsellFormContext, IUpsellFormContext } from '../../Context';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
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
      <Grid container className={classes.root}>
        <Grid item xs={true}>
          <Button variant='contained' color='secondary' onClick={this.handlePrevious}>
            <ArrowLeftIcon />
            Anterior
          </Button>
        </Grid>
        <Grid item xs='auto'>
          <Button variant='contained' color='secondary' onClick={this.handleNext}>
            Próximo
            <ArrowRightIcon />
          </Button>
        </Grid>
      </Grid>
    );
  }
}
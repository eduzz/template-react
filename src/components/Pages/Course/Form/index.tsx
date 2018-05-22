import { Card, Divider, MuiThemeProvider, Step, StepLabel, Stepper } from '@material-ui/core';
import { reverseTheme } from 'assets/theme';
import Toolbar from 'components/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import { IAppRoute } from 'interfaces/route';
import React, { Fragment, PureComponent } from 'react';

import EssentialFormStep from './Steps/Essentials';

interface IState {
  currentStep: number;
}

interface IProps {
  classes?: any;
}

@WithStyles({
  stepper: {
    marginBottom: 20
  }
})
export default class CourseFormPage extends PureComponent<IProps, IState> {
  public static routes: IAppRoute[] = [];

  constructor(props: {}) {
    super(props);
    this.state = { ...this.state, currentStep: 0 };
  }

  nextStep() {
    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep + 1 });
  }

  render() {
    const { currentStep } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title='Novo Curso' />

        <Card className={classes.stepper}>
          <MuiThemeProvider theme={reverseTheme}>
            <Stepper activeStep={currentStep} alternativeLabel>
              <Step>
                <StepLabel>Essencial</StepLabel>
              </Step>
              <Step>
                <StepLabel>Avançado</StepLabel>
              </Step>
              <Step>
                <StepLabel>Personalizações</StepLabel>
              </Step>
            </Stepper>
          </MuiThemeProvider>

          <Divider light />

          {currentStep === 0 && <EssentialFormStep onComplete={this.nextStep.bind(this)} />}

        </Card>
      </Fragment>
    );
  }
}
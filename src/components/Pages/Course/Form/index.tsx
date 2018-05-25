import { Card, Divider, MuiThemeProvider, Step, StepLabel, Stepper } from '@material-ui/core';
import { reverseTheme } from 'assets/theme';
import Toolbar from 'components/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import { ICourse } from 'interfaces/course';
import { IAppRoute } from 'interfaces/route';
import React, { Fragment, PureComponent } from 'react';

import { ScrollTopContext } from '../../../AppWrapper';
import AdvancedFormStep from './Steps/Advanced';
import EssentialFormStep from './Steps/Essentials';

interface IState {
  course?: ICourse;
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
  static routes: IAppRoute[] = [];

  scrollTop: Function;

  constructor(props: {}) {
    super(props);
    this.state = { ...this.state, currentStep: 0 };
  }

  nextStep(course: ICourse) {
    this.scrollTop();

    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep + 1, course });
  }

  render() {
    const { currentStep, course } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title={course ? `Curso ${course.title}` : 'Novo Curso'} />

        <ScrollTopContext.Consumer>
          {scrollTop => (this.scrollTop = scrollTop) && null}
        </ScrollTopContext.Consumer>

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

          {currentStep === 0 && <EssentialFormStep course={course} onComplete={this.nextStep.bind(this)} />}
          {currentStep === 1 && <AdvancedFormStep course={course} onComplete={this.nextStep.bind(this)} />}

        </Card>
      </Fragment>
    );
  }
}
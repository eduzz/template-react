import {
  Button,
  Card,
  CardActions,
  CircularProgress,
  Divider,
  MuiThemeProvider,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';
import { reverseTheme } from 'assets/theme';
import Snackbar from 'components/Snackbar';
import Toolbar from 'components/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import { ICourse } from 'interfaces/course';
import { IAppRoute } from 'interfaces/route';
import { ChevronRightIcon } from 'mdi-react';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { cleanCourseSaveError } from 'store/actionCreators/course';

import { ScrollTopContext } from '../../../AppWrapper';
import { IStepComponent, IStepContext, StepContext } from './Steps';
import AdvancedFormStep from './Steps/Advanced';
import CustomizationFormStep from './Steps/Customization';
import EssentialFormStep from './Steps/Essentials';

interface IState {
  course?: ICourse;
  currentStep: number;
}

interface IProps {
  classes?: any;
}

interface IPropsFromConnect {
  saving: boolean;
  savingError: any;
  cleanCourseSaveError?: typeof cleanCourseSaveError;
}

@WithStyles({
  stepper: {
    marginBottom: 20
  },
  footer: {
    justifyContent: 'flex-end'
  },
  progressWrapper: {
    padding: '40px 0',
    textAlign: 'center'
  },
  progressButton: {
    marginLeft: 10
  }
})
class CourseFormPage extends PureComponent<IProps & IPropsFromConnect, IState> {
  static routes: IAppRoute[] = [];

  scrollTop: Function;
  steppers: IStepComponent[] = [];
  registerCurrentStepper: IStepContext = {
    register: (component) => {
      this.steppers.push(component);
    },
    unregister: (component) => {
      this.steppers = this.steppers.filter(s => s !== component);
    }
  };

  constructor(props: IProps & IPropsFromConnect) {
    super(props);

    this.state = { ...this.state, currentStep: 2 };
  }

  nextStep(course: ICourse) {
    this.scrollTop();

    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep + 1, course });
  }

  handleSave(event: Event) {
    event.preventDefault();
    this.steppers.forEach(s => s.askSave());
  }

  render() {
    const { currentStep, course } = this.state;
    const { classes, saving, savingError, cleanCourseSaveError } = this.props;

    return (
      <Fragment>
        <Toolbar title={course ? `Curso ${course.title}` : 'Novo Curso'} />
        <Snackbar opened={!!savingError} error={savingError} onClose={() => cleanCourseSaveError()} />

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

          <StepContext.Provider value={this.registerCurrentStepper}>
            {currentStep === 0 &&
              <EssentialFormStep course={course} onComplete={this.nextStep.bind(this)} />
            }

            {currentStep === 1 &&
              <AdvancedFormStep course={course} onComplete={this.nextStep.bind(this)} />
            }

            {currentStep === 2 &&
              <CustomizationFormStep course={course} onComplete={this.nextStep.bind(this)} />
            }
          </StepContext.Provider>

          <CardActions className={classes.footer}>
            <Button onClick={this.handleSave.bind(this)} disabled={saving} color='secondary' className='icon-right'>
              {saving ? 'Salvando' : 'Próximo'}
              {saving ?
                <CircularProgress color='secondary' className={classes.progressButton} size={18} /> :
                <ChevronRightIcon />
              }
            </Button>
          </CardActions>

        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}): IPropsFromConnect => {
  return {
    saving: state.course.isSaving,
    savingError: state.course.saveError
  };
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  cleanCourseSaveError
})(CourseFormPage);
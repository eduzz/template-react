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
import AppRouter, { RouterContext } from 'components/Router';
import Snackbar from 'components/Snackbar';
import Toolbar from 'components/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import { ICourse } from 'interfaces/course';
import { IAppRoute } from 'interfaces/route';
import { ChevronRightIcon } from 'mdi-react';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import {
  cleanCourseAdvancedSaveError,
  cleanCourseCustomizationSaveError,
  cleanCourseSaveError,
} from 'store/actionCreators/course';

import { ScrollTopContext } from '../../../AppWrapper';
import FormManager from '../FormParts';
import AdvancedFormStep from '../FormParts/Advanced';
import CustomizationFormStep from '../FormParts/Customization';
import EssentialFormStep from '../FormParts/Essentials';

interface IState {
  course?: ICourse;
  currentStep: 0 | 1 | 2;
}

interface IProps {
  classes?: any;
}

interface IPropsFromConnect {
  saving: boolean;
  savingError: any;
  cleanCourseSaveError?: typeof cleanCourseSaveError;
  cleanCourseAdvancedSaveError?: typeof cleanCourseAdvancedSaveError;
  cleanCourseCustomizationSaveError?: typeof cleanCourseCustomizationSaveError;
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
class CourseWizardPage extends PureComponent<IProps & IPropsFromConnect, IState> {
  static routes: IAppRoute[] = [];

  scrollTop: Function;
  getRouter: () => AppRouter;
  formManager: FormManager;

  constructor(props: IProps & IPropsFromConnect) {
    super(props);
    this.state = { ...this.state, currentStep: 0 };
  }

  handleStepCompleted(course: ICourse) {
    const { currentStep } = this.state;

    this.scrollTop();

    if (currentStep === 0) {
      Snackbar.show('Curso criado, adicone mais informações');
    }

    if (currentStep === 2) {
      Snackbar.show('Curso salvo com successo');
      this.getRouter().navigate(`/course`);
      return;
    }

    this.setState({ currentStep: currentStep + 1 as any, course });
  }

  handleSave(event: Event) {
    event.preventDefault();
    this.formManager.askSave();
  }

  handleClearError() {
    this.props.cleanCourseSaveError();
    this.props.cleanCourseAdvancedSaveError();
    this.props.cleanCourseCustomizationSaveError();
  }

  render() {
    const { currentStep, course } = this.state;
    const { classes, saving, savingError } = this.props;

    return (
      <Fragment>
        <Snackbar opened={!!savingError} error={savingError} onClose={this.handleClearError.bind(this)} />

        <ScrollTopContext.Consumer>
          {scrollTop => (this.scrollTop = scrollTop) && null}
        </ScrollTopContext.Consumer>

        <RouterContext.Consumer>
          {getRouter => (this.getRouter = getRouter) && null}
        </RouterContext.Consumer>

        <Toolbar title={course ? `Curso ${course.title}` : 'Novo Curso'} />

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

          <FormManager ref={ref => this.formManager = ref}>
            {currentStep === 0 &&
              <EssentialFormStep course={course} onComplete={this.handleStepCompleted.bind(this)} />
            }

            {currentStep === 1 &&
              <AdvancedFormStep course={course} onComplete={this.handleStepCompleted.bind(this)} />
            }

            {currentStep === 2 &&
              <CustomizationFormStep course={course} onComplete={this.handleStepCompleted.bind(this)} />
            }
          </FormManager>

          <CardActions className={classes.footer}>
            <Button onClick={this.handleSave.bind(this)} disabled={saving} color='secondary' className='icon-right'>
              {saving ? 'Salvando' : currentStep === 2 ? 'Salvar' : 'Próximo'}
              {saving ?
                <CircularProgress color='secondary' className={classes.progressButton} size={18} /> :
                currentStep === 2 ? null : <ChevronRightIcon />
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
    saving:
      state.course.save.isSaving ||
      state.course.saveAdvanced.isSaving ||
      state.course.saveCustomization.isSaving,
    savingError:
      state.course.save.error ||
      state.course.saveAdvanced.error ||
      state.course.saveCustomization.error
  };
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  cleanCourseSaveError,
  cleanCourseAdvancedSaveError,
  cleanCourseCustomizationSaveError
})(CourseWizardPage);
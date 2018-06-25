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
import { ScrollTopContext } from 'components/AppWrapper';
import AppRouter, { RouterContext } from 'components/Router';
import Snackbar from 'components/Snackbar';
import Toolbar from 'components/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import { ICourse } from 'interfaces/course';
import { IAppRoute } from 'interfaces/route';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import React, { Fragment, PureComponent } from 'react';

import FormManager from '../FormParts';
import CourseAdvancedForm from '../FormParts/Advanced';
import CourseCustomizationForm from '../FormParts/Customization';
import CourseEssentialForm from '../FormParts/Essentials';

interface IState {
  course?: ICourse;
  saving: boolean;
  currentStep: 0 | 1 | 2;
}

interface IProps {
  classes?: any;
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
export default class CourseWizardPage extends PureComponent<IProps, IState> {
  static routes: IAppRoute[] = [];

  scrollTop: Function;
  getRouter: () => AppRouter;

  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, currentStep: 0 };
  }

  async onSubmit(formManager: FormManager) {
    const status = await formManager.trySave();

    if (!status.success) {
      Snackbar.error((status.reasons || ['Não foi possível salvar']).join('<br />'));
      return;
    }

    this.nextStep(status.results[0]);
  }

  nextStep(course: ICourse) {
    const { currentStep } = this.state;

    this.scrollTop();

    if (currentStep === 0) {
      Snackbar.show('Curso criado, adicone mais informações');
      this.getRouter().changeUrl(`/course/${course.id}/edit`);
    }

    if (currentStep === 2) {
      Snackbar.show('Curso salvo com successo');
      this.getRouter().navigate(`/course`);
      return;
    }

    this.setState({ currentStep: currentStep + 1 as any, course });
  }

  render() {
    const { currentStep, course, saving } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
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

          <FormManager onSubmit={this.onSubmit.bind(this)}>
            {currentStep === 0 &&
              <CourseEssentialForm course={course} />
            }

            {currentStep === 1 &&
              <CourseAdvancedForm course={course} />
            }

            {currentStep === 2 &&
              <CourseCustomizationForm course={course} />
            }

            <CardActions className={classes.footer}>
              <Button type='submit' disabled={saving} color='secondary' className='icon-right'>
                {saving ? 'Salvando' : currentStep === 2 ? 'Salvar' : 'Próximo'}
                {saving ?
                  <CircularProgress color='secondary' className={classes.progressButton} size={18} /> :
                  currentStep === 2 ? null : <ChevronRightIcon />
                }
              </Button>
            </CardActions>
          </FormManager>

        </Card>
      </Fragment>
    );
  }
}
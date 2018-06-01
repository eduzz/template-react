import { Button, Card, CardContent, CircularProgress, Tab, Tabs } from '@material-ui/core';
import ErrorMessage from 'components/ErrorMessage';
import Snackbar from 'components/Snackbar';
import Toolbar from 'components/Toolbar';
import { ToolbarTabs } from 'components/ToolbarTabs';
import { WithStyles } from 'decorators/withStyles';
import { ICourse } from 'interfaces/course';
import { IAppRoute } from 'interfaces/route';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IAppStoreState } from 'store';
import {
  cleanCourseAdvancedSaveError,
  cleanCourseCustomizationSaveError,
  cleanCourseSaveError,
  requestGet,
} from 'store/actionCreators/course';

import { ScrollTopContext } from '../../../AppWrapper';
import FormManager from '../FormParts';
import AdvancedFormStep from '../FormParts/Advanced';
import EssentialFormStep from '../FormParts/Essentials';
import CustomizationFormStep from '../FormParts/Customization';

interface IState {
  course?: ICourse;
  currentTab: number;
}

interface IProps extends RouteComponentProps<{ id: number }> {
  classes?: any;
}

interface IPropsFromConnect {
  course: ICourse;

  loadingError: any;
  saving: boolean;
  savingError: any;

  requestGet?: typeof requestGet;
  cleanCourseSaveError?: typeof cleanCourseSaveError;
  cleanCourseAdvancedSaveError?: typeof cleanCourseAdvancedSaveError;
  cleanCourseCustomizationSaveError?: typeof cleanCourseCustomizationSaveError;
}

@WithStyles({
  buttons: {
    marginTop: 20,
    textAlign: 'right'
  },
  loadingContainer: {
    textAlign: 'center'
  },
  progressButton: {
    marginLeft: 10
  }
})
class CourseWizardPage extends PureComponent<IProps & IPropsFromConnect, IState> {
  static routes: IAppRoute[] = [];

  scrollTop: Function;
  formManager: FormManager;

  constructor(props: IProps & IPropsFromConnect) {
    super(props);
    this.state = { ...this.state, currentTab: 0 };
  }

  static getDerivedStateFromProps(nextProps: IProps & IPropsFromConnect, currentState: IState): IState {
    return {
      ...currentState,
      course: currentState.course || nextProps.course,
    };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    const { requestGet, match } = this.props;
    requestGet(match.params.id);
  }

  onPartComplete(course: ICourse) {
    this.scrollTop();
  }

  onTabChange(event: any, tab: number) {
    this.scrollTop();
    this.setState({ currentTab: tab });
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
    const { currentTab, course } = this.state;
    const { classes, saving, savingError, loadingError } = this.props;

    return (
      <Fragment>
        <Snackbar opened={!!savingError} error={savingError} onClose={this.handleClearError.bind(this)} />

        <ScrollTopContext.Consumer>
          {scrollTop => (this.scrollTop = scrollTop) && null}
        </ScrollTopContext.Consumer>

        <Toolbar title={course ? `Curso ${course.title}` : 'Editar Curso'} />
        <ToolbarTabs>
          <Tabs value={currentTab} onChange={this.onTabChange.bind(this)}>
            <Tab disabled={!course} label='Essencial' />
            <Tab disabled={!course} label='Avançado' />
            <Tab disabled={!course} label='Personalizações' />
          </Tabs>
        </ToolbarTabs>

        <Card>
          {!course && !loadingError &&
            <CardContent className={classes.loadingContainer}>
              <CircularProgress color='secondary' />
            </CardContent>
          }

          {loadingError &&
            <ErrorMessage error={loadingError} tryAgain={this.load.bind(this)} />
          }

          {course &&
            <FormManager ref={ref => this.formManager = ref}>
              <span className={currentTab === 0 ? '' : 'hide'}>
                <EssentialFormStep course={course} onComplete={this.onPartComplete.bind(this)} />
              </span>

              <span className={currentTab === 1 ? '' : 'hide'}>
                <AdvancedFormStep course={course} onComplete={this.onPartComplete.bind(this)} />
              </span>

              <span className={currentTab === 2 ? '' : 'hide'}>
                <CustomizationFormStep course={course} onComplete={this.onPartComplete.bind(this)} />
              </span>
            </FormManager>
          }
        </Card>

        <div className={classes.buttons}>
          <Button
            color='secondary'
            variant='raised'
            disabled={saving || !course}
            onClick={this.handleSave.bind(this)}>
            {saving ? 'Salvando' : 'Salvar'}
            {saving &&
              <CircularProgress color='secondary' className={classes.progressButton} size={18} />
            }
          </Button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}): IPropsFromConnect => {
  return {
    course: state.course.get.course,
    loadingError: state.course.get.error,
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
  requestGet,
  cleanCourseSaveError,
  cleanCourseAdvancedSaveError,
  cleanCourseCustomizationSaveError
})(CourseWizardPage);
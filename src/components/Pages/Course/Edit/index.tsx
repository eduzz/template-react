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
  clearGet,
  requestGet,
} from 'store/actionCreators/course';

import { ScrollTopContext } from '../../../AppWrapper';
import FormManager from '../FormParts';
import CourseAdvancedForm from '../FormParts/Advanced';
import CourseCustomizationForm from '../FormParts/Customization';
import CourseEssentialForm from '../FormParts/Essentials';

interface IState {
  course?: ICourse;
  courseId: number;
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
  clearGet?: typeof clearGet;
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
    this.state = { ...this.state, courseId: props.match.params.id, currentTab: 2 };
  }

  static getDerivedStateFromProps(nextProps: IProps & IPropsFromConnect, currentState: IState): IState {
    const propCourse = nextProps.course && nextProps.course.id == currentState.courseId ?
      nextProps.course :
      null;

    return {
      ...currentState,
      course: currentState.course || propCourse
    };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    const { courseId } = this.state;
    this.props.requestGet(courseId);
  }

  onTabChange(event: any, tab: number) {
    this.scrollTop();
    this.setState({ currentTab: tab });
  }

  async onSubmit(formManager: FormManager) {
    const status = await formManager.trySave();

    if (!status.success) {
      Snackbar.error((status.reasons || ['Não foi possível salvar']).join('<br />'));
      return;
    }

    Snackbar.show('Curso atualizado');
  }

  handleClearError() {
    this.props.cleanCourseSaveError();
    this.props.cleanCourseAdvancedSaveError();
    this.props.cleanCourseCustomizationSaveError();
  }

  render() {
    const { currentTab, course } = this.state;
    const { classes, saving, loadingError } = this.props;

    return (
      <Fragment>
        <ScrollTopContext.Consumer>
          {scrollTop => (this.scrollTop = scrollTop) && null}
        </ScrollTopContext.Consumer>

        <Toolbar title={course ? `Editar ${course.title}` : 'Editar Curso'} />
        <ToolbarTabs>
          <Tabs value={currentTab} onChange={this.onTabChange.bind(this)}>
            <Tab disabled={!course} label='Essencial' />
            <Tab disabled={!course} label='Avançado' />
            <Tab disabled={!course} label='Personalizações' />
          </Tabs>
        </ToolbarTabs>

        <FormManager onSubmit={this.onSubmit.bind(this)}>
          {!course && !loadingError &&
            <Card>
              <CardContent className={classes.loadingContainer}>
                <CircularProgress color='secondary' />
              </CardContent>
            </Card>
          }

          {loadingError &&
            <ErrorMessage error={loadingError} tryAgain={this.load.bind(this)} />
          }

          {course &&
            <Fragment>
              <Card>
                <span className={currentTab === 0 ? '' : 'hide'}>
                  <CourseEssentialForm course={course} />
                </span>

                <span className={currentTab === 1 ? '' : 'hide'}>
                  <CourseAdvancedForm course={course} />
                </span>

                <span className={currentTab === 2 ? '' : 'hide'}>
                  <CourseCustomizationForm course={course} />
                </span>
              </Card>

              <div className={classes.buttons}>
                <Button
                  color='secondary'
                  variant='raised'
                  disabled={saving || !course}
                  type='submit'
                >
                  {saving ? 'Salvando' : 'Salvar'}
                  {saving &&
                    <CircularProgress color='secondary' className={classes.progressButton} size={18} />
                  }
                </Button>
              </div>
            </Fragment>
          }
        </FormManager>

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
  clearGet,
  cleanCourseSaveError,
  cleanCourseAdvancedSaveError,
  cleanCourseCustomizationSaveError
})(CourseWizardPage);
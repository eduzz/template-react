import { Button, Card, CardContent, CircularProgress, Tab, Tabs } from '@material-ui/core';
import { ScrollTopContext } from 'components/AppWrapper';
import ErrorMessage from 'components/ErrorMessage';
import Snackbar from 'components/Snackbar';
import Toolbar from 'components/Toolbar';
import { ToolbarTabs } from 'components/ToolbarTabs';
import { WithStyles } from 'decorators/withStyles';
import { ICourse } from 'interfaces/course';
import { IAppRoute } from 'interfaces/route';
import React, { Fragment, PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import FormManager from '../FormParts';
import CourseAdvancedForm from '../FormParts/Advanced';
import CourseCustomizationForm from '../FormParts/Customization';
import CourseEssentialForm from '../FormParts/Essentials';

interface IState {
  course?: ICourse;
  courseId: number;
  currentTab: number;

  loadingError: any;
  saving: boolean;
  savingError: any;
}

interface IProps extends RouteComponentProps<{ id: number }> {
  classes?: any;
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
export default class CourseWizardPage extends PureComponent<IProps, IState> {
  static routes: IAppRoute[] = [];

  scrollTop: Function;
  formManager: FormManager;

  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, courseId: props.match.params.id, currentTab: 2 };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    // const { courseId } = this.state;
    // this.props.requestGet(courseId);
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

  render() {
    const { currentTab, course, saving, loadingError } = this.state;
    const { classes } = this.props;

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
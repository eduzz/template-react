import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Slide } from '@material-ui/core';
import ErrorMessage from 'components/ErrorMessage';
import { FormComponent, IStateForm } from 'components/FormComponent';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { FieldAutocomplete, FieldSelect, FieldText, ValidationContext } from 'material-ui-form-fields';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { cleanAccessGroupListError, requestAccessGroupList } from 'store/actionCreators/accessGroup';
import { cleanCourseListError, requestCourseList } from 'store/actionCreators/course';
import { cancelUserFormModal, cleanUserSaveError, requestUserSave } from 'store/actionCreators/user';

interface IState extends IStateForm<{
  email: string;
  group: number;
  course: number;
}> { }

interface IPropsFromConnect {
  opened: boolean;
  loading: boolean;
  accessGroups: { value: number, label: string }[];
  courses: { value: number, label: string }[];
  classes?: any;
  loadingError?: any;
  saveError?: any;
  cancelUserFormModal?: typeof cancelUserFormModal;
  requestCourseList?: typeof requestCourseList;
  requestAccessGroupList?: typeof requestAccessGroupList;
  cleanAccessGroupListError?: typeof cleanAccessGroupListError;
  cleanCourseListError?: typeof cleanCourseListError;
  requestUserSave?: typeof requestUserSave;
  cleanUserSaveError?: typeof cleanUserSaveError;
}

@WithStyles(theme => ({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
}))
class UserFormModal extends FormComponent<IPropsFromConnect, IState> {
  static getDerivedStateFromProps(nextProps: IPropsFromConnect, currentState: IState) {
    if (nextProps.opened && !nextProps.loadingError) {
      if (!nextProps.courses.length) nextProps.requestCourseList();
      if (!nextProps.accessGroups.length) nextProps.requestAccessGroupList();
    }

    return currentState;
  }

  onCancel() {
    this.props.cancelUserFormModal();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const { model } = this.state;
    const { requestUserSave } = this.props;

    const isValid = this.isFormValid();
    if (!isValid) return;

    requestUserSave(model as any);
  }

  tryLoad() {
    const { loading, courses, accessGroups, requestCourseList, requestAccessGroupList } = this.props;
    if (loading) true;

    if (!courses.length) requestCourseList();
    if (!accessGroups.length) requestAccessGroupList();
  }

  resetState() {
    const { cleanCourseListError, cleanAccessGroupListError } = this.props;

    cleanCourseListError();
    cleanAccessGroupListError();

    this.resetForm();
  }

  render() {
    const { model } = this.state;
    const { opened, loading, courses, classes, saveError, loadingError, cleanUserSaveError, accessGroups } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onExited={this.resetState.bind(this)}
        TransitionComponent={Transition}>

        <Snackbar opened={!!saveError} error={saveError} onClose={() => cleanUserSaveError()} />

        {loading && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <ValidationContext ref={this.bindValidationContext.bind(this)}>
            <DialogTitle>Novo Usuário</DialogTitle>
            <DialogContent className={classes.content}>
              {loadingError &&
                <ErrorMessage error={loadingError} tryAgain={this.tryLoad.bind(this)} />
              }

              {!loadingError &&
                <Fragment>
                  <FieldText
                    label='Email'
                    type='email'
                    disabled={loading}
                    value={model.email}
                    validation='required|email'
                    onChange={this.updateModel((model, v) => model.email = v)}
                    margin='none'
                  />

                  <FieldSelect
                    label='Grupo'
                    options={accessGroups}
                    disabled={loading}
                    value={model.group}
                    validation='required'
                    onChange={this.updateModel((model, v) => model.group = v)}
                  />

                  <FieldAutocomplete
                    label='Curso'
                    options={courses}
                    disabled={loading}
                    value={model.course}
                    validation='required'
                    onChange={this.updateModel((model, v) => model.course = v)}
                  />
                </Fragment>
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onCancel.bind(this)}>
                Cancelar
            </Button>
              <Button color='secondary' type='submit' disabled={loading || !!loadingError}>
                Salvar
            </Button>
            </DialogActions>
          </ValidationContext>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}) => {
  return {
    opened: state.user.isFormOpened,
    loading: state.course.list.isFetching || state.accessGroup.isFetching || state.user.isSaving,
    loadingError: state.course.list.error || state.accessGroup.error,
    saveError: state.user.saveError,
    accessGroups: state.accessGroup.accessGroups.map(g => ({ value: g.id, label: g.name })),
    courses: state.course.list.courses.map(c => ({ value: c.id, label: c.title }))
  };
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
  cancelUserFormModal,
  requestCourseList,
  requestAccessGroupList,
  cleanCourseListError,
  cleanAccessGroupListError,
  requestUserSave,
  cleanUserSaveError
})(UserFormModal);

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
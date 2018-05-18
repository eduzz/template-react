import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Slide } from '@material-ui/core';
import ErrorMessage from 'components/ErrorMessage';
import { FieldSelect, FieldText } from 'components/Field';
import { FormComponent, IStateForm } from 'components/FormComponent';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import {
  cancelAccessGroupFormModal,
  cleanAccessGroupListError,
  cleanAccessGroupSaveError,
  requestAccessGroupList,
  requestAccessGroupSave,
} from 'store/actionCreators/accessGroup';
import { cleanCourseListError, requestCourseList } from 'store/actionCreators/course';

import AccessGroupValidator from './validator';

interface IState extends IStateForm<{
  email: string;
  group: number;
  course: number;
}> { }

interface IPropsFromConnect {
  opened: boolean;
  loading: boolean;
  accessGroups: { value: number, label: string }[];
  classes?: any;
  loadingError?: any;
  saveError?: any;
  cancelAccessGroupFormModal?: typeof cancelAccessGroupFormModal;
  requestAccessGroupList?: typeof requestAccessGroupList;
  cleanAccessGroupListError?: typeof cleanAccessGroupListError;
  requestAccessGroupSave?: typeof requestAccessGroupSave;
  cleanAccessGroupSaveError?: typeof cleanAccessGroupSaveError;
}

@WithStyles(theme => ({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
}))
class AccessGroupFormModal extends FormComponent<IPropsFromConnect, IState> {
  validator = new AccessGroupValidator();

  constructor(props: any) {
    super(props);
    this.state = { formSubmitted: false, model: {} };
  }

  static getDerivedStateFromProps(nextProps: IPropsFromConnect, currentState: IState) {
    if (nextProps.opened && !nextProps.loadingError) {
      if (!nextProps.accessGroups.length) nextProps.requestAccessGroupList();
    }

    return currentState;
  }

  onCancel() {
    this.props.cancelAccessGroupFormModal();
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const { model } = this.state;
    const { requestAccessGroupSave } = this.props;

    const isValid = await this.isFormValid();
    if (!isValid) return;

    requestAccessGroupSave(model as any);
  }

  tryLoad() {
    const { loading, accessGroups, requestAccessGroupList } = this.props;
    if (loading) true;

    if (!accessGroups.length) requestAccessGroupList();
  }

  resetState() {
    const { cleanAccessGroupListError } = this.props;

    cleanAccessGroupListError();

    this.resetForm();
  }

  render() {
    const { model, formSubmitted } = this.state;
    const { opened, loading, classes, saveError, loadingError, cleanAccessGroupSaveError, accessGroups } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onExited={this.resetState.bind(this)}
        TransitionComponent={Transition}>

        <Snackbar opened={!!saveError} error={saveError} onClose={() => cleanAccessGroupSaveError()} />

        {loading && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <DialogTitle>Grupo de Acesso</DialogTitle>
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
                  submitted={formSubmitted}
                  error={this.getErrorMessage('email')}
                  onChange={this.updateModel((model, v) => model.email = v)}
                  margin='none'
                />

                <FieldSelect
                  label='Grupo'
                  options={accessGroups}
                  disabled={loading}
                  value={model.group}
                  submitted={formSubmitted}
                  error={this.getErrorMessage('group')}
                  onChange={this.updateModel((model, v) => model.group = v)}
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
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}) => {
  return {
    opened: state.accessGroup.isAccessGroupFormModalOpened,
    loading: state.accessGroup.isFetching || state.accessGroup.isSaving,
    loadingError: state.accessGroup.error,
    saveError: state.accessGroup.saveError,
    accessGroups: state.accessGroup.accessGroups.map(g => ({ value: g.id, label: g.name }))
  };
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
  cancelAccessGroupFormModal,
  requestCourseList,
  requestAccessGroupList,
  cleanCourseListError,
  cleanAccessGroupListError,
  requestAccessGroupSave,
  cleanAccessGroupSaveError
})(AccessGroupFormModal);

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
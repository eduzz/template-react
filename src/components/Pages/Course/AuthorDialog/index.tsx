import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Slide } from '@material-ui/core';
import { FieldText, FieldValidation } from 'components/Field';
import { FormComponent, IStateForm } from 'components/FormComponent';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { IAuthor } from 'interfaces/author';
import React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { cancelAuthorFormModal, cleanAuthorSaveError, requestAuthorSave } from 'store/actionCreators/author';

interface IState extends IStateForm<IAuthor> { }

interface IPropsFromConnect {
  opened: boolean;
  saving: boolean;
  saveError?: any;
  classes?: any;
  cancelAuthorFormModal?: typeof cancelAuthorFormModal;
  requestAuthorSave?: typeof requestAuthorSave;
  cleanAuthorSaveError?: typeof cleanAuthorSaveError;
}

@WithStyles(theme => ({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
}))
class AuthorFormModal extends FormComponent<IPropsFromConnect, IState> {
  onCancel() {
    this.props.cancelAuthorFormModal();
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const { model } = this.state;
    const { requestAuthorSave } = this.props;

    const isValid = await this.isFormValid();
    if (!isValid) return;

    requestAuthorSave(model as any);
  }

  resetState() {
    this.resetForm();
  }

  render() {
    const { model } = this.state;
    const { opened, saving, classes, saveError, cleanAuthorSaveError } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onExited={this.resetState.bind(this)}
        TransitionComponent={Transition}>

        <Snackbar opened={!!saveError} error={saveError} onClose={() => cleanAuthorSaveError()} />

        {saving && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <FieldValidation.Provider value={this.registerFields}>
            <DialogTitle>Novo Autor</DialogTitle>
            <DialogContent className={classes.content}>

              <FieldText
                label='Nome'
                disabled={saving}
                value={model.name}
                validation='required'
                onChange={this.updateModel((model, v) => model.name = v)}
              />

              <FieldText
                label='Description'
                disabled={saving}
                value={model.description}
                multiline
                rows={4}
                validation='required'
                onChange={this.updateModel((model, v) => model.description = v)}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.onCancel.bind(this)}>
                Cancelar
            </Button>
              <Button color='secondary' type='submit' disabled={saving}>
                Salvar
            </Button>
            </DialogActions>
          </FieldValidation.Provider>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}) => {
  return {
    opened: state.author.isFormOpened,
    saving: state.author.isSaving,
    saveError: state.author.saveError,
  };
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
  cancelAuthorFormModal,
  requestAuthorSave,
  cleanAuthorSaveError
})(AuthorFormModal);

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
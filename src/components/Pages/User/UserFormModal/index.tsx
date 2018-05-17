import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@material-ui/core';
import { FieldAutocomplete, FieldDate, FieldSelect, FieldText } from 'components/Field';
import { FormComponent, IStateForm } from 'components/FormComponent';
import { WithStyles } from 'decorators/withStyles';
import React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { cancelUserFormModal } from 'store/actionCreators/user';

import UserValidator from './validator';

interface IState extends IStateForm<{
  email: string;
  group: string;
}> { }

interface IPropsFromConnect {
  opened: boolean;
  loading: boolean;
  classes?: any;
  cancelUserFormModal?: typeof cancelUserFormModal;
}

@WithStyles(theme => ({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
}))
class UserFormModal extends FormComponent<IPropsFromConnect, IState> {
  validator = new UserValidator();

  constructor(props: any) {
    super(props);
    this.state = { formSubmitted: false, model: {} };
  }

  onCancel() {
    this.props.cancelUserFormModal();
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    // const { model } = this.state;
    // const { requestLogin } = this.props;

    const isValid = await this.isFormValid();
    if (!isValid) return;

    // requestLogin(model.username, model.password);
  }

  render() {
    const { model, formSubmitted } = this.state;
    const { opened, loading, classes } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onExited={this.resetForm.bind(this)}
        TransitionComponent={Transition}>

        <form onSubmit={this.onSubmit.bind(this)}>
          <DialogTitle>Novo Usuário</DialogTitle>
          <DialogContent>

            <div className={classes.content}>
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
                options={[{ value: 1, label: 'Teste' }]}
                disabled={loading}
                value={model.group}
                submitted={formSubmitted}
                error={this.getErrorMessage('group')}
                onChange={this.updateModel((model, v) => model.group = v)}
              />

              <FieldDate
                label='Grupo'
                disabled={loading}
                value={model.group}
                submitted={formSubmitted}
                error={this.getErrorMessage('group')}
                onChange={this.updateModel((model, v) => model.group = v)}
              />

              <FieldAutocomplete />
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCancel.bind(this)}>
              Cancelar
            </Button>
            <Button color='secondary' type='submit'>
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
    opened: state.user.userFormModal.isOpened,
    loading: false,
  };
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
  cancelUserFormModal
})(UserFormModal);

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Slide } from '@material-ui/core';
import { FieldText, ValidationContext } from '@react-form-fields/material-ui';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Snackbar from 'components/Shared/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { IUser } from 'interfaces/user';
import React, { FormEvent, Fragment } from 'react';
import rxjsOperators from 'rxjs-operators';
import userService from 'services/user';

interface IState extends IStateForm<IUser> {
  loading: boolean;
}

interface IProps {
  opened: boolean;
  user?: IUser;
  onComplete: (user: IUser) => void;
  onCancel: () => void;
  classes?: any;
}

@WithStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  },
  heading: {
    marginTop: 20,
    marginBottom: 10
  }
})
export default class UserFormDialog extends FormComponent<IProps, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  get isEdit(): boolean {
    return !!this.state.model.id;
  }

  handleEnter = () => {
    const { user } = this.props;

    this.setState({ model: user || {} });
  }

  handleExit = () => {
    this.resetForm();
  }

  onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { model } = this.state;
    const { onComplete } = this.props;

    if (!this.isFormValid()) return;

    this.setState({ loading: true });

    userService.save(model as IUser).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(user => {
      Snackbar.show(`${user.name} foi salvo${this.isEdit ? '' : ', um email foi enviado com a senha'}`);
      this.setState({ loading: false });

      onComplete(user);
    }, err => {
      Snackbar.error(err.message === 'email-unavailable' ? 'Email já utlizado' : err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading } = this.state;
    const { opened, classes, onCancel } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onEnter={this.handleEnter}
        onExited={this.handleExit}
        TransitionComponent={Transition}
      >

        {loading && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit} noValidate>
          <ValidationContext ref={this.bindValidationContext}>
            <DialogTitle>{this.isEdit ? 'Editar' : 'Novo'} Usuário</DialogTitle>
            <DialogContent className={classes.content}>
              <Fragment>
                <FieldText
                  label='Nome'
                  disabled={loading}
                  value={model.name}
                  validation='required|min:3|max:50'
                  onChange={this.updateModel((model, v) => model.name = v)}
                />

                <FieldText
                  label='Email'
                  type='email'
                  disabled={loading}
                  value={model.email}
                  validation='required|email|max:150'
                  onChange={this.updateModel((model, v) => model.email = v)}
                />

              </Fragment>
            </DialogContent>
            <DialogActions>
              <Button onClick={onCancel}>
                Cancelar
            </Button>
              <Button color='secondary' type='submit' disabled={loading}>
                Salvar
            </Button>
            </DialogActions>
          </ValidationContext>
        </form>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
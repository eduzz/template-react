import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Slide } from '@material-ui/core';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import FieldText from 'material-ui-form-fields/components/Text';
import ValidationContext from 'material-ui-form-fields/components/ValidationContext';
import * as React from 'react';
import { Subscription } from 'rxjs';
import rxjsOperators from 'rxjs-operators';
import { IBindableComponent } from 'rxjs-operators/bindComponent';
import authService from 'services/auth';

interface IState extends IStateForm<{
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}> {
  opened: boolean;
  loading: boolean;
}

interface IProps {
  classes?: any;
}

@WithStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
})
export default class ChangePasswordDialog extends FormComponent<IProps, IState> implements IBindableComponent {
  subscriptions: Subscription[] = [];

  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, opened: false, loading: false };
  }

  componentDidMount() {
    authService.shouldOpenChangePassword().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(opened => {
      this.setState({ opened });
    });
  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onCancel() {
    authService.closeChangePassword();
  }

  async onSubmit(event: Event) {
    const { model } = this.state;

    event.preventDefault();

    const isValid = await this.isFormValid();
    if (!isValid) return;

    this.setState({ loading: true });

    authService.changePassword(model.currentPassword, model.newPassword).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      this.setState({ loading: false });

      Snackbar.show('Senha alterada com sucesso!');
      authService.closeChangePassword();
    }, err => {
      Snackbar.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { opened, loading, model } = this.state;
    const { classes } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={opened}
        onExited={this.resetForm.bind(this)}
        TransitionComponent={Transition}>

        {loading && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <ValidationContext ref={this.bindValidationContext.bind(this)}>
            <DialogTitle>Trocar Senha</DialogTitle>

            <DialogContent className={classes.content}>
              <FieldText
                label='Senha Atual'
                type='password'
                disabled={loading}
                value={model.currentPassword}
                validation='required'
                onChange={this.updateModel((model, v) => model.currentPassword = v)}
              />

              <FieldText
                label='Nova senha'
                type='password'
                disabled={loading}
                value={model.newPassword}
                validation='required|min:5'
                onChange={this.updateModel((model, v) => model.newPassword = v)}
              />

              <FieldText
                label='Repita a senha'
                type='password'
                disabled={loading}
                value={model.confirmPassword}
                validation='required|same:nova senha'
                validationContext={{ 'nova senha': model.newPassword }}
                onChange={this.updateModel((model, v) => model.confirmPassword = v)}
              />
            </DialogContent>

            <DialogActions>
              <Button disabled={loading} onClick={this.onCancel.bind(this)}>Cancelar</Button>
              <Button color='secondary' type='submit' disabled={loading}>Salvar</Button>
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
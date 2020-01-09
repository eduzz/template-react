import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import Toast from 'components/Shared/Toast';
import { logError } from 'helpers/rxjs-operators/logError';
import useModel from 'hooks/useModel';
import React, { forwardRef, memo, useCallback, useState } from 'react';
import { useCallbackObservable, useObservable } from 'react-use-observable';
import { of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import authService from 'services/auth';

interface IModel {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const useStyle = makeStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
});

const ChangePasswordDialog = memo((props: {}) => {
  const classes = useStyle(props);
  const [model, setModelProp, , , cleanModel] = useModel<IModel>();
  const [loading, setLoading] = useState(false);

  const [opened] = useObservable(() => {
    return authService.shouldOpenChangePassword().pipe(logError());
  }, []);

  const onCancel = useCallback(() => authService.closeChangePassword(), []);

  const [onSubmit] = useCallbackObservable(
    (isValid: boolean) => {
      return of(isValid).pipe(
        filter(isValid => isValid),
        tap(() => setLoading(true)),
        switchMap(() => authService.changePassword(model.currentPassword, model.newPassword)),
        tap(
          () => {
            setLoading(false);
            Toast.show('Senha alterada com sucesso!');
            authService.closeChangePassword();
          },
          err => {
            setLoading(false);
            Toast.error(err);
          }
        ),
        logError()
      );
    },
    [model]
  );

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={opened || false}
      onExited={cleanModel}
      TransitionComponent={Transition}
    >
      {loading && <LinearProgress color='secondary' />}

      <FormValidation onSubmit={onSubmit}>
        <DialogTitle>Trocar Senha</DialogTitle>

        <DialogContent className={classes.content}>
          <FieldText
            label='Senha Atual'
            type='password'
            disabled={loading}
            value={model.currentPassword}
            validation='required'
            onChange={setModelProp('currentPassword', (model, v) => (model.currentPassword = v))}
          />

          <FieldText
            label='Nova senha'
            type='password'
            disabled={loading}
            value={model.newPassword}
            validation='required|min:5'
            onChange={setModelProp('newPassword', (model, v) => (model.newPassword = v))}
          />

          <FieldText
            label='Repita a senha'
            type='password'
            disabled={loading}
            value={model.confirmPassword}
            validation='required|same:nova senha'
            validationContext={{ 'nova senha': model.newPassword }}
            onChange={setModelProp('confirmPassword', (model, v) => (model.confirmPassword = v))}
          />
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={onCancel}>
            Cancelar
          </Button>
          <Button color='primary' type='submit' disabled={loading}>
            Salvar
          </Button>
        </DialogActions>
      </FormValidation>
    </Dialog>
  );
});

const Transition = memo(
  forwardRef((props: any, ref: any) => {
    return <Slide direction='up' {...props} ref={ref} />;
  })
);

export default ChangePasswordDialog;

import { memo, useCallback } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { tap } from 'rxjs/operators';

import useForm from '@eduzz/houston-forms/useForm';
import useObservable from '@eduzz/houston-hooks/useObservable';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';

import Toast from 'components/Shared/Toast';
import errorToast from 'helpers/rxjs-operators/errorToast';
import authService from 'services/auth';

const useStyle = makeStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
});

const ChangePasswordDialog = memo((props: any) => {
  const classes = useStyle(props);

  const [opened] = useObservable(() => authService.shouldOpenChangePassword(), []);
  const onCancel = useCallback(() => authService.closeChangePassword(), []);

  const form = useForm({
    initialValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    validationSchema: yup =>
      yup.object().shape({
        currentPassword: yup.string().required(),
        newPassword: yup.string().required().min(5).max(25),
        confirmPassword: yup
          .string()
          .required()
          .oneOf([yup.ref('newPassword'), null], 'Não confere')
      }),
    onSubmit(model) {
      return authService.changePassword(model.currentPassword, model.newPassword).pipe(
        tap(() => {
          Toast.show('Senha alterada com sucesso!');
          authService.closeChangePassword();
        }),
        errorToast()
      );
    }
  });

  const handleExited = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={opened || false} onExited={handleExited}>
      {form.isSubmitting && <LinearProgress color='primary' />}

      <Form context={form}>
        <DialogTitle>Trocar Senha</DialogTitle>

        <DialogContent className={classes.content}>
          <TextField label='Senha Atual' type='password' name='currentPassword' />
          <TextField label='Nova senha' type='password' name='newPassword' />
          <TextField label='Repita a senha' type='password' name='confirmPassword' />
        </DialogContent>

        <DialogActions>
          <Button disabled={form.isSubmitting} onClick={onCancel}>
            Cancelar
          </Button>
          <Button color='primary' type='submit' disabled={form.isSubmitting}>
            Salvar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
});

export default ChangePasswordDialog;

import { memo, useCallback } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import authService from 'services/auth';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';
import Toast from '@eduzz/houston-ui/Toast';

const useStyle = makeStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
});

interface IProps {
  opened: boolean;
  onComplete: () => void;
}

interface IModel {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordDialog = memo(({ opened, onComplete }: IProps) => {
  const classes = useStyle();

  const form = useForm<IModel>({
    validationSchema: yup =>
      yup.object().shape({
        currentPassword: yup.string().required(),
        newPassword: yup.string().required().min(5).max(25),
        confirmPassword: yup
          .string()
          .required()
          .oneOf([yup.ref('newPassword'), null], 'Não confere')
      }),
    async onSubmit(model) {
      await authService.changePassword(model.currentPassword, model.newPassword);
      Toast.success('Senha alterada com sucesso!');
    }
  });

  const handleExited = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <Dialog open={opened} TransitionProps={{ onExited: handleExited }}>
      {form.isSubmitting && <LinearProgress color='primary' />}

      <Form context={form}>
        <DialogTitle>Trocar Senha</DialogTitle>

        <DialogContent className={classes.content}>
          <TextField label='Senha Atual' type='password' name='currentPassword' />
          <TextField label='Nova senha' type='password' name='newPassword' />
          <TextField label='Repita a senha' type='password' name='confirmPassword' />
        </DialogContent>

        <DialogActions>
          <Button disabled={form.isSubmitting} variant='text' onClick={onComplete}>
            Cancelar
          </Button>
          <Button type='submit' disabled={form.isSubmitting}>
            Salvar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
});

export default ChangePasswordDialog;

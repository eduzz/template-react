import { useCallback, memo } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';

import useForm from '@eduzz/houston-forms/useForm';
import usePromiseCallback from '@eduzz/houston-hooks/usePromiseCallback';
import styled, { IStyledProp } from '@eduzz/houston-styles';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import Input from '@eduzz/houston-ui/Forms/Input';
import Toast from '@eduzz/houston-ui/Toast';

import { User, userSchema } from '@/schemas/user';
import userService from '@/services/user';

interface IProps extends IStyledProp {
  opened: boolean;
  user: User | null;
  onComplete: (user: User) => void;
  onCancel: () => void;
}

const FormDialog: React.FC<IProps> = ({ opened, user, onComplete, onCancel, className }) => {
  const form = useForm<User>({
    validationSchema: userSchema
  });

  const handleSubmit = usePromiseCallback(async (isSubscribed, model: User) => {
    const user = await userService.save(model);
    Toast.success(`${user.name} foi salvo${model.id ? '' : ', um email foi enviado com a senha'}`);
    isSubscribed() && onComplete(user);
  }, []);

  const handleEnter = useCallback(() => {
    form.reset(user ?? {});
  }, [form, user]);

  const handleExited = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <Dialog open={opened} disableEscapeKeyDown TransitionProps={{ onEnter: handleEnter, onExited: handleExited }}>
      {form.formState.isSubmitting && <LinearProgress color='primary' />}

      <Form context={form} onSubmit={handleSubmit} className={className}>
        <DialogTitle>Usuário</DialogTitle>
        <DialogContent className='content'>
          <Input label='Nome' name='name' />
          <Input label='Email' name='email' type='email' />
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={onCancel}>
            Cancelar
          </Button>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            Salvar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default styled(memo(FormDialog))`
  & .content {
    width: 600;
    max-width: calc(95vw - 50px);
  }
`;

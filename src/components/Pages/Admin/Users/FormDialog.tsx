import { memo, useCallback } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';
import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';
import Toast from '@eduzz/houston-ui/Toast';

import IUser from '@/interfaces/models/user';
import userService from '@/services/user';

interface IProps {
  opened: boolean;
  user?: IUser;
  onComplete: (user: IUser) => void;
  onCancel: () => void;
}

const useStyle = createUseStyles({
  content: {
    width: 600,
    maxWidth: 'calc(95vw - 50px)'
  },
  heading: {
    marginTop: 20,
    marginBottom: 10
  }
});

const FormDialog = memo((props: IProps) => {
  const classes = useStyle(props);

  const form = useForm<IUser>({
    validationSchema: yup =>
      yup.object().shape({
        firstName: yup.string().required().min(3).max(50),
        lastName: yup.string().required().min(3).max(50),
        email: yup.string().required().email().max(150),
        roles: yup.array().required().min(1)
      }),
    async onSubmit(model) {
      const user = await userService.save(model);
      Toast.success(`${user.firstName} foi salvo${model.id ? '' : ', um email foi enviado com a senha'}`);
      props.onComplete(user);
    }
  });

  const handleEnter = useCallback(() => {
    form.setValues(props.user ?? {}, false);
  }, [form, props.user]);

  const handleExited = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <Dialog open={props.opened} disableEscapeKeyDown TransitionProps={{ onEnter: handleEnter, onExited: handleExited }}>
      {form.isSubmitting && <LinearProgress color='primary' />}

      <Form context={form}>
        <DialogTitle>{form.values.id ? 'Editar' : 'Novo'} Usuário</DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label='Nome' name='firstName' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Sobrenome' name='lastName' />
            </Grid>
          </Grid>

          <TextField label='Email' name='email' type='email' />
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={props.onCancel}>
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

export default FormDialog;

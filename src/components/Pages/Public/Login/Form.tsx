import { memo, MouseEvent } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';
import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';

import authService from '@/services/auth';

interface IProps {
  onRecoveryAccess: (e: MouseEvent<HTMLElement>) => void;
}

const useStyles = createUseStyles(theme => ({
  buttons: {
    justifyContent: 'space-between'
  },
  socialButtons: {
    marginTop: theme.spacing(2)
  }
}));

const LoginForm = memo((props: IProps) => {
  const classes = useStyles(props);

  const form = useForm({
    initialValues: { email: '', password: '' },
    validationSchema: yup =>
      yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required()
      }),
    async onSubmit(model) {
      await authService.login(model.email, model.password);
    }
  });

  return (
    <Form context={form}>
      <Card>
        <CardContent>
          <TextField name='email' label='Email' type='email' />
          <TextField label='Senha' name='password' type='password' margin='none' />
        </CardContent>

        <CardActions className={classes.buttons}>
          <Button disabled={form.isSubmitting} variant='text' onClick={props.onRecoveryAccess}>
            Recuperar Acesso
          </Button>
          <Button disabled={form.isSubmitting} type='submit'>
            Entrar
          </Button>
        </CardActions>

        {form.isSubmitting && <LinearProgress color='primary' />}
      </Card>
    </Form>
  );
});
export default LoginForm;

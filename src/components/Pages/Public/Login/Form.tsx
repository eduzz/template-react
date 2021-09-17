import { memo, MouseEvent } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import authService from 'services/auth';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';

interface IProps {
  onRecoveryAccess: (e: MouseEvent<HTMLElement>) => void;
}

const useStyles = makeStyles(theme => ({
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

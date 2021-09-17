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
import Toast from '@eduzz/houston-ui/Toast';
import Typography from '@eduzz/houston-ui/Typography';

interface IProps {
  onCancel: (e: MouseEvent<HTMLElement>) => void;
  onComplete: () => void;
}

const useStyle = makeStyles({
  buttons: {
    justifyContent: 'space-between'
  }
});

const LoginRecoveryAccess = memo((props: IProps) => {
  const classes = useStyle(props);

  const form = useForm({
    initialValues: { email: '' },
    validationSchema: yup =>
      yup.object().shape({
        email: yup.string().required().email()
      }),
    async onSubmit(model) {
      await authService.sendResetPassword(model.email);

      Toast.info('Foi enviado um link para seu email para podermos recuperar seu acesso.');
      props.onComplete();
      form.reset();
    }
  });

  return (
    <Form context={form}>
      <Card>
        <CardContent>
          <Typography marginBottom>Iremos lhe enviar um email para recuperar seu acesso</Typography>

          <TextField label='Email' type='email' name='email' margin='none' />
        </CardContent>

        <CardActions className={classes.buttons}>
          <Button disabled={form.isSubmitting} variant='text' onClick={props.onCancel}>
            Voltar
          </Button>
          <Button disabled={form.isSubmitting} type='submit'>
            Enviar
          </Button>
        </CardActions>

        {form.isSubmitting && <LinearProgress color='primary' />}
      </Card>
    </Form>
  );
});

export default LoginRecoveryAccess;

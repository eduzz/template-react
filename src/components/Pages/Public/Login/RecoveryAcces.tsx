import { memo, MouseEvent } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Toast from '@eduzz/houston-ui/Toast';
import Typography from '@eduzz/houston-ui/Typography';

import authService from '@/services/auth';

interface IProps extends IStyledProp {
  onCancel: (e: MouseEvent<HTMLElement>) => void;
  onComplete: () => void;
}

const LoginRecoveryAccess: React.FC<IProps> = ({ onComplete, onCancel, className }) => {
  const form = useForm({
    initialValues: { email: '' },
    validationSchema: yup => yup.object().shape({ email: yup.string().required().email() }),
    async onSubmit(model) {
      await authService.sendResetPassword(model.email);

      Toast.info('Foi enviado um link para seu email para podermos recuperar seu acesso.');
      onComplete();
      form.reset();
    }
  });

  return (
    <Form context={form} className={className}>
      <Card>
        <CardContent>
          <Typography marginBottom>Iremos lhe enviar um email para recuperar seu acesso</Typography>
          <TextField label='Email' type='email' name='email' margin='none' />
        </CardContent>

        <CardActions className='buttons'>
          <Button disabled={form.isSubmitting} variant='text' onClick={onCancel}>
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
};

export default styled(memo(LoginRecoveryAccess))`
  & > .buttons {
    justify-content: 'space-between';
  }
`;

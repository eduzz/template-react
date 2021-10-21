import { useCallback, useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router-dom';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import logoWhite from '@/assets/images/logo-white.png';
import splashImage from '@/assets/images/splash.png';
import decodeJWTToken from '@/helpers/jwt';
import IResetPasswordToken from '@/interfaces/tokens/resetPasswordToken';
import authService from '@/services/auth';

interface IProps extends RouteComponentProps<{ t: string }>, IStyledProp {}

const NewPasswordPage: React.FC<IProps> = ({ history, location, className }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>();
  const [tokenData, setTokenData] = useState<IResetPasswordToken>();

  const form = useForm({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: yup =>
      yup.object().shape({
        password: yup.string().required().min(5).max(25),
        confirmPassword: yup
          .string()
          .required()
          .oneOf([yup.ref('password'), null], 'Não confere')
      }),
    async onSubmit(model) {
      await authService.resetPassword(token, model.password);
      await authService.login(tokenData.email, model.password);
    }
  });

  useEffect(() => {
    const token = queryString.parse(location.search).t as string;
    const tokenData = decodeJWTToken<IResetPasswordToken>(token);

    setToken(token);
    setTokenData(tokenData);
    setLoading(false);
  }, [location.search]);

  const handleBack = useCallback(() => history.push('/'), [history]);

  return (
    <div className={className}>
      <div className='container'>
        <div className='logo'>
          <img src={logoWhite} className='logoImage' alt='logo' />
        </div>

        {!loading && !tokenData && (
          <Card>
            <CardContent>
              <Typography>Token Inválido</Typography>
            </CardContent>

            <CardActions className='buttonsBack'>
              <Button type='button' startIcon={<ChevronLeftIcon />} onClick={handleBack}>
                Voltar para o Login
              </Button>
            </CardActions>
          </Card>
        )}

        {!loading && !!tokenData && (
          <Form context={form}>
            <Card>
              <CardContent>
                <Typography marginBottom>Olá {tokenData?.firstName}, informe sua nova senha:</Typography>

                <TextField label='Nova senha' type='password' name='password' />
                <TextField label='Repita a senha' type='password' name='confirmPassword' margin='none' />
              </CardContent>

              <CardActions className='buttons'>
                <Button disabled={loading || form.isSubmitting} type='submit'>
                  Salvar
                </Button>
              </CardActions>

              {(loading || form.isSubmitting) && <LinearProgress color='primary' />}
            </Card>
          </Form>
        )}
      </div>
    </div>
  );
};

export default styled(NewPasswordPage)`
  background: url(${splashImage}) no-repeat center;
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
  position: relative;

  & .container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 320px;
    height: 400px;
    max-width: calc(100% - 30px);
    color: white;
  }

  & .logo {
    text-align: center;
    margin-bottom: 20px;
  }

  & .logoImage {
    max-width: 100%;
    max-height: 120px;
  }

  & .viewContainer {
    box-sizing: border-box;
    padding: 0 10px;
    height: 310px;
  }

  & .buttonsBack {
    justify-content: flex-start;
  }

  & .buttons {
    justify-content: flex-end;
  }
`;

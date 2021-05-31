import { memo, useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import { switchMap, tap } from 'rxjs/operators';

import useForm from '@eduzz/houston-forms/useForm';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';

import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';

import logoWhite from 'assets/images/logo-white.png';
import Toast from 'components/Shared/Toast';
import errorToast from 'helpers/rxjs-operators/errorToast';
import IResetPasswordToken from 'interfaces/tokens/resetPasswordToken';
import queryString from 'query-string';
import authService from 'services/auth';
import tokenService from 'services/token';

import useStyles from './style';

interface IProps extends RouteComponentProps<{ t: string }> {}

const NewPasswordPage = memo((props: IProps) => {
  const classes = useStyles(props);
  const { history } = props;

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
    onSubmit(model) {
      return authService.resetPassword(token, model.password).pipe(
        switchMap(() => authService.login(tokenData.email, model.password)),
        tap(() => {
          Toast.show('Senha alterada com sucesso!');
          props.history.push('/');
        }),
        errorToast()
      );
    }
  });

  useEffect(() => {
    const token = queryString.parse(props.location.search).t as string;
    const tokenData = tokenService.decode<IResetPasswordToken>(token);

    setToken(token);
    setTokenData(tokenData);
    setLoading(false);
  }, [props.location.search]);

  console.log({ tokenData });

  const handleBack = useCallback(() => history.push('/'), [history]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <img src={logoWhite} className={classes.logoImage} alt='logo' />
        </div>

        {!loading && !tokenData && (
          <Card>
            <CardContent>
              <Typography>Token Inválido</Typography>
            </CardContent>

            <CardActions className={classes.buttonsBack}>
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
                <Typography gutterBottom>Olá {tokenData?.firstName}, informe sua nova senha:</Typography>

                <TextField label='Nova senha' type='password' name='password' />
                <TextField label='Repita a senha' type='password' name='confirmPassword' margin='none' />
              </CardContent>

              <CardActions className={classes.buttons}>
                <Button disabled={loading || form.isSubmitting} color='primary' type='submit'>
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
});
export default NewPasswordPage;

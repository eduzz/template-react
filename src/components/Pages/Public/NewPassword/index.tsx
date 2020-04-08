import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import logoWhite from 'assets/images/logo-white.png';
import Toast from 'components/Shared/Toast';
import { logError } from 'helpers/rxjs-operators/logError';
import { useFormikObservable } from 'hooks/useFormikObservable';
import IResetPasswordToken from 'interfaces/tokens/resetPasswordToken';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import queryString from 'query-string';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { switchMap, tap } from 'rxjs/operators';
import authService from 'services/auth';
import tokenService from 'services/token';
import * as yup from 'yup';

import useStyles from './style';

interface IProps extends RouteComponentProps<{ t: string }> {}

const validationSchema = yup.object().shape({
  password: yup.string().required().min(5).max(25),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Não confere')
});

const NewPasswordPage = memo((props: IProps) => {
  const classes = useStyles(props);
  const { history } = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>();
  const [tokenData, setTokenData] = useState<IResetPasswordToken>();

  const formik = useFormikObservable({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema,
    onSubmit(model) {
      return authService.resetPassword(token, model.password).pipe(
        switchMap(() => authService.login(tokenData.email, model.password)),
        tap(() => {
          Toast.show('Senha alterada com sucesso!');
          props.history.push('/');
        }),
        logError(true)
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
          <form noValidate onSubmit={formik.handleSubmit}>
            <Card>
              <CardContent>
                <Typography gutterBottom>Olá {tokenData?.firstName}, informe sua nova senha:</Typography>

                <TextField
                  label='Nova senha'
                  type='password'
                  name='password'
                  disabled={loading || formik.isSubmitting}
                  value={formik.values.password}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                  onChange={formik.handleChange}
                  fullWidth
                />

                <TextField
                  label='Repita a senha'
                  type='password'
                  name='confirmPassword'
                  disabled={loading || formik.isSubmitting}
                  value={formik.values.confirmPassword}
                  error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  onChange={formik.handleChange}
                  fullWidth
                  margin='none'
                />
              </CardContent>

              <CardActions className={classes.buttons}>
                <Button disabled={loading || formik.isSubmitting} color='primary' type='submit'>
                  Salvar
                </Button>
              </CardActions>

              {(loading || formik.isSubmitting) && <LinearProgress color='primary' />}
            </Card>
          </form>
        )}
      </div>
    </div>
  );
});
export default NewPasswordPage;

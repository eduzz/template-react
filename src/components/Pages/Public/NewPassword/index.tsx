import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import logoWhite from 'assets/images/logo-white.png';
import Toast from 'components/Shared/Toast';
import { logError } from 'helpers/rxjs-operators/logError';
import useModel from 'hooks/useModel';
import IResetPasswordToken from 'interfaces/tokens/resetPasswordToken';
import queryString from 'query-string';
import React, { memo, useEffect, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useCallbackObservable } from 'react-use-observable';
import { of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import authService from 'services/auth';
import tokenService from 'services/token';

import useStyles from './style';

interface IProps extends RouteComponentProps<{ t: string }> {}

const NewPasswordPage = memo((props: IProps) => {
  const classes = useStyles(props);

  const [model, setModelProp] = useModel<{ password: string; confirmPassword: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>();
  const [tokenData, setTokenData] = useState<IResetPasswordToken>();

  useEffect(() => {
    const token = queryString.parse(props.location.search).t as string;
    const tokenData = tokenService.decode<IResetPasswordToken>(token);

    setToken(token);
    setTokenData(tokenData);
    setLoading(false);
  }, [props.location.search]);

  const [onSubmit] = useCallbackObservable(
    (isValid: boolean) => {
      return of(isValid).pipe(
        filter(isValid => isValid),
        tap(() => setLoading(true)),
        switchMap(() => authService.resetPassword(token, model.password)),
        switchMap(() => authService.login(tokenData.email, model.password)),
        tap(
          () => {
            Toast.show('Senha alterada com sucesso!');
            props.history.push('/');
          },
          err => {
            Toast.error(err);
            setLoading(false);
          }
        ),
        logError()
      );
    },
    [tokenData, model, props.history]
  );

  if (!loading && !tokenData) {
    return <Redirect to='/' />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <img src={logoWhite} className={classes.logoImage} alt='logo' />
        </div>

        <FormValidation onSubmit={onSubmit}>
          <Card>
            <CardContent>
              <Typography>Olá {tokenData?.firstName}, informe sua nova senha:</Typography>

              <FieldText
                label='Nova senha'
                type='password'
                disabled={loading}
                value={model.password}
                validation='required|min:5'
                onChange={setModelProp('password', (model, v) => (model.password = v))}
              />

              <FieldText
                label='Repita a senha'
                type='password'
                disabled={loading}
                value={model.confirmPassword}
                validation='required|same:nova senha'
                validationContext={{ 'nova senha': model.password }}
                onChange={setModelProp('confirmPassword', (model, v) => (model.confirmPassword = v))}
              />
            </CardContent>

            <CardActions className={classes.buttons}>
              <Button disabled={loading} color='primary' type='submit'>
                Salvar
              </Button>
            </CardActions>

            {loading && <LinearProgress color='secondary' />}
          </Card>
        </FormValidation>
      </div>
    </div>
  );
});
export default NewPasswordPage;

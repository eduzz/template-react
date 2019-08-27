import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import Toast from 'components/Shared/Toast';
import { logError } from 'helpers/rxjs-operators/logError';
import useModel from 'hooks/useModel';
import React, { memo, MouseEvent, useState } from 'react';
import { useCallbackObservable } from 'react-use-observable';
import { of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import authService from 'services/auth';

interface IProps {
  onRecoveryAccess: (e: MouseEvent<HTMLElement>) => void;
}

const useStyles = makeStyles({
  buttons: {
    justifyContent: 'space-between'
  }
});

const LoginDialogForm = memo((props: IProps) => {
  const classes = useStyles(props);

  const [model, setModelProp, , , cleanModel] = useModel<{ email: string; password: string }>();
  const [loading, setLoading] = useState(false);

  const [onSubmit] = useCallbackObservable(
    (isValid: boolean) => {
      return of(isValid).pipe(
        filter(isValid => isValid),
        tap(() => setLoading(true)),
        switchMap(() => authService.login(model.email, model.password)),
        tap(
          () => {
            setLoading(false);
            cleanModel();
          },
          err => {
            Toast.error(err);
            setLoading(false);
          }
        ),
        logError()
      );
    },
    [model]
  );

  return (
    <FormValidation onSubmit={onSubmit}>
      <Card>
        <CardContent>
          <FieldText
            label='Email'
            type='email'
            disabled={loading}
            value={model.email}
            validation='required|email'
            onChange={setModelProp('email', (model, v) => (model.email = v))}
            margin='dense'
          />

          <FieldText
            label='Senha'
            type='password'
            disabled={loading}
            value={model.password}
            validation='required'
            onChange={setModelProp('password', (model, v) => (model.password = v))}
          />
        </CardContent>

        <CardActions className={classes.buttons}>
          <Button disabled={loading} size='small' onClick={props.onRecoveryAccess}>
            Recuperar Acesso
          </Button>
          <Button disabled={loading} color='primary' type='submit'>
            Entrar
          </Button>
        </CardActions>

        {loading && <LinearProgress color='secondary' />}
      </Card>
    </FormValidation>
  );
});
export default LoginDialogForm;

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
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
  onCancel: (e: MouseEvent<HTMLElement>) => void;
  onComplete: () => void;
}

const useStyle = makeStyles({
  buttons: {
    justifyContent: 'space-between'
  }
});

const LoginDialogRecoveryAccess = memo((props: IProps) => {
  const classes = useStyle(props);
  const [model, setModelProp] = useModel<{ email: string }>();
  const [loading, setLoading] = useState(false);

  const [onSubmit] = useCallbackObservable(
    (isValid: boolean) => {
      return of(isValid).pipe(
        filter(isValid => isValid),
        tap(() => setLoading(true)),
        switchMap(() => authService.sendResetPassword(model.email)),
        tap(
          () => {
            setLoading(false);
            Toast.show('Foi enviado um link para seu email para podermos recuperar seu acesso.');
            props.onComplete();
          },
          err => {
            setLoading(false);
            Toast.error(err);
          }
        ),
        logError()
      );
    },
    [props.onComplete, model]
  );

  return (
    <FormValidation onSubmit={onSubmit}>
      <Card>
        <CardContent>
          <Typography>Iremos lhe enviar um email para recuperar seu acesso</Typography>

          <FieldText
            label='Email'
            type='email'
            disabled={loading}
            value={model.email}
            validation='required|email'
            onChange={setModelProp('email', (model, v) => (model.email = v))}
          />
        </CardContent>

        <CardActions className={classes.buttons}>
          <Button disabled={loading} size='small' onClick={props.onCancel}>
            Voltar
          </Button>
          <Button disabled={loading} color='primary' type='submit'>
            Enviar
          </Button>
        </CardActions>

        {loading && <LinearProgress color='secondary' />}
      </Card>
    </FormValidation>
  );
});

export default LoginDialogRecoveryAccess;

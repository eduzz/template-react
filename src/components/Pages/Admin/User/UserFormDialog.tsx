import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import FieldCheckbox from '@react-form-fields/material-ui/components/Checkbox';
import CustomMessage from '@react-form-fields/material-ui/components/CustomMessage';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldHidden from '@react-form-fields/material-ui/components/Hidden';
import FieldText from '@react-form-fields/material-ui/components/Text';
import ErrorMessage from 'components/Shared/ErrorMessage';
import Toast from 'components/Shared/Toast';
import { logError } from 'helpers/rxjs-operators/logError';
import useModel from 'hooks/useModel';
import IUser from 'interfaces/models/user';
import IUserRole from 'interfaces/models/userRole';
import React, { forwardRef, Fragment, memo, useCallback, useState } from 'react';
import { useCallbackObservable, useRetryableObservable } from 'react-use-observable';
import { of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import userService from 'services/user';

interface IProps {
  opened: boolean;
  user?: IUser;
  onComplete: (user: IUser) => void;
  onCancel: () => void;
}

const useStyle = makeStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  },
  heading: {
    marginTop: 20,
    marginBottom: 10
  }
});

const UserFormDialog = memo((props: IProps) => {
  const classes = useStyle(props);

  const [model, setModelProp, setModel, , clearModel] = useModel<IUser>({ roles: [] });
  const [loading, setLoading] = useState<boolean>(true);

  const [roles, rolesError, , retryRoles] = useRetryableObservable<Array<IUserRole>>(() => {
    setLoading(true);

    return userService.roles().pipe(
      tap(
        () => setLoading(false),
        () => setLoading(false)
      ),
      logError()
    );
  }, []);

  const handleEnter = useCallback(() => {
    setModel({ ...(props.user || {}), roles: props.user && props.user.roles ? props.user.roles : [] });
    retryRoles();
  }, [props.user, retryRoles, setModel]);

  const handleExit = useCallback(() => {
    clearModel();
  }, [clearModel]);

  const [onSubmit] = useCallbackObservable(
    (isValid: boolean) => {
      return of(isValid).pipe(
        filter(isValid => isValid),
        tap(() => setLoading(true)),
        switchMap(() => userService.save(model as IUser)),
        tap(
          user => {
            Toast.show(`${user.firstName} foi salvo${model.id ? '' : ', um email foi enviado com a senha'}`);
            props.onComplete(user);
            setLoading(false);
          },
          err => {
            Toast.error(err.message === 'email-unavailable' ? 'Email já utlizado' : err);
            setLoading(false);
          }
        ),
        logError()
      );
    },
    [model]
  );

  return (
    <Dialog
      open={props.opened}
      disableBackdropClick
      disableEscapeKeyDown
      onEnter={handleEnter}
      onExited={handleExit}
      TransitionComponent={Transition}
    >
      {loading && <LinearProgress color='secondary' />}

      <FormValidation onSubmit={onSubmit}>
        <DialogTitle>{model.id ? 'Editar' : 'Novo'} Usuário</DialogTitle>
        <DialogContent className={classes.content}>
          {rolesError && <ErrorMessage error={rolesError} tryAgain={retryRoles} />}

          {!rolesError && (
            <Fragment>
              <FieldText
                label='Nome'
                disabled={loading}
                value={model.firstName}
                validation='required|min:3|max:50'
                onChange={setModelProp('firstName', (model, v) => (model.firstName = v))}
              />

              <FieldText
                label='Sobrenome'
                disabled={loading}
                value={model.lastName}
                validation='string|min:3|max:50'
                onChange={setModelProp('lastName', (model, v) => (model.lastName = v))}
              />

              <FieldText
                label='Email'
                type='email'
                disabled={loading}
                value={model.email}
                validation='required|email|max:150'
                onChange={setModelProp('email', (model, v) => (model.email = v))}
              />

              <Typography variant='subtitle1' className={classes.heading}>
                Acesso
              </Typography>

              <FieldHidden value={model.roles.length} validation='required|numeric|min:1'>
                <CustomMessage rules='min,required,numeric'>Selecione ao menos um</CustomMessage>
              </FieldHidden>

              {(roles || []).map(role => (
                <div key={role.role}>
                  <FieldCheckbox
                    helperText={role.description}
                    checked={model.roles.includes(role.role)}
                    label={role.name}
                    onChange={setModelProp(`role-${role.role}`, model =>
                      model.roles.includes(role.role)
                        ? (model.roles = model.roles.filter(r => r !== role.role))
                        : (model.roles = [...model.roles, role.role])
                    )}
                  />
                </div>
              ))}
            </Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>Cancelar</Button>
          <Button color='primary' type='submit' disabled={loading || !!rolesError}>
            Salvar
          </Button>
        </DialogActions>
      </FormValidation>
    </Dialog>
  );
});

const Transition = memo(
  forwardRef((props: any, ref: any) => {
    return <Slide direction='up' {...props} ref={ref} />;
  })
);

export default UserFormDialog;

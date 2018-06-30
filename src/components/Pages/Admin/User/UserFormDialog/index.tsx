import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Slide,
  Typography,
} from '@material-ui/core';
import { CustomMessage, FieldCheckbox, FieldHidden, FieldText, ValidationContext } from '@react-form-fields/material-ui';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import ErrorMessage from 'components/ErrorMessage';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { makeWritable } from 'helpers/immutable';
import { IUser } from 'interfaces/user';
import { IUserRole } from 'interfaces/userRole';
import React, { FormEvent, Fragment } from 'react';
import rxjsOperators from 'rxjs-operators';
import userService from 'services/user';

interface IState extends IStateForm<IUser> {
  loading: boolean;
  roles: Array<IUserRole & { selected?: boolean }>;
  error?: null;
}

interface IProps {
  opened: boolean;
  user?: IUser;
  onComplete: (user: IUser) => void;
  onCancel: () => void;
  classes?: any;
}

@WithStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  },
  heading: {
    marginTop: 20,
    marginBottom: 10
  }
})
export default class UserFormDialog extends FormComponent<IProps, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ...this.state,
      roles: [],
      loading: true
    };
  }

  get isEdit(): boolean {
    return !!this.state.model.id;
  }

  handleEnter = () => {
    const { user } = this.props;

    this.setState({ model: user || {} });
    this.loadData();
  }

  handleExit = () => {
    this.resetForm();

    const roles = this.state.roles.map(r => ({ ...r, selected: false }));
    this.setState({ roles });
  }

  loadData = () => {
    this.setState({ loading: true, error: null });

    userService.roles().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(roles => {
      const { user } = this.props;

      this.setState({
        roles: makeWritable(roles).map(r => ({ ...r, selected: !user ? false : user.roles.includes(r.role) })),
        loading: false
      });
    }, error => {
      this.setState({ loading: false, error });
    });
  }

  onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { model, roles } = this.state;
    const { onComplete } = this.props;

    if (!this.isFormValid()) return;

    this.setState({ loading: true });
    model.roles = roles.filter(r => r.selected).map(r => r.role);

    userService.save(model as IUser).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(user => {
      Snackbar.show(`${user.firstName} foi salvo${this.isEdit ? '' : ', um email foi enviado com a senha'}`);
      this.setState({ loading: false });

      onComplete(user);
    }, err => {
      Snackbar.error(err.message === 'email-unavailable' ? 'Email já utlizado' : err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading, error, roles } = this.state;
    const { opened, classes, onCancel } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onEnter={this.handleEnter}
        onExited={this.handleExit}
        TransitionComponent={Transition}>

        {loading && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit} noValidate>
          <ValidationContext ref={this.bindValidationContext}>
            <DialogTitle>{this.isEdit ? 'Editar' : 'Novo'} Usuário</DialogTitle>
            <DialogContent className={classes.content}>
              {error &&
                <ErrorMessage error={error} tryAgain={this.loadData} />
              }

              {!error &&
                <Fragment>
                  <FieldText
                    label='Nome'
                    disabled={loading}
                    value={model.firstName}
                    validation='required|min:3|max:50'
                    onChange={this.updateModel((model, v) => model.firstName = v)}
                  />

                  <FieldText
                    label='Sobrenome'
                    disabled={loading}
                    value={model.lastName}
                    validation='string|min:3|max:50'
                    onChange={this.updateModel((model, v) => model.lastName = v)}
                  />

                  <FieldText
                    label='Email'
                    type='email'
                    disabled={loading}
                    value={model.email}
                    validation='required|email|max:150'
                    onChange={this.updateModel((model, v) => model.email = v)}
                  />

                  <Typography variant='subheading' className={classes.heading}>
                    Acesso
                  </Typography>

                  <FieldHidden
                    value={roles.filter(r => r.selected).length}
                    validation='required|numeric|min:1'
                  >
                    <CustomMessage rules='min,required,numeric'>Selecione ao menos um</CustomMessage>
                  </FieldHidden>

                  {roles.map(role =>
                    <div key={role.role}>
                      <FieldCheckbox
                        helperText={role.description}
                        checked={role.selected}
                        label={role.name}
                        onChange={this.updateModel((m, v) => role.selected = v)}
                      />
                    </div>
                  )}
                </Fragment>
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={onCancel}>
                Cancelar
            </Button>
              <Button color='secondary' type='submit' disabled={loading || !!error}>
                Salvar
            </Button>
            </DialogActions>
          </ValidationContext>
        </form>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
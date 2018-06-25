import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Slide } from '@material-ui/core';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import ErrorMessage from 'components/ErrorMessage';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { IUser } from 'interfaces/user';
import { FieldAutocomplete, FieldSelect, FieldText, ValidationContext } from 'material-ui-form-fields';
import React, { FormEvent, Fragment } from 'react';
import * as rxjs from 'rxjs';
import rxjsOperators from 'rxjs-operators';
import accessGroupService from 'services/accessGroup';
import courseService from 'services/course';
import userService from 'services/user';

interface IState extends IStateForm<IUser> {
  loading: boolean;
  courses: { value: number; label: string; }[];
  accessGroups: { value: number; label: string; }[];
  error?: null;
}

interface IProps {
  opened: boolean;
  onComplete: () => void;
  onCancel: () => void;
  classes?: any;
}

@WithStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
})
export default class UserFormDialog extends FormComponent<IProps, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ...this.state,
      loading: true,
      courses: [],
      accessGroups: []
    };
  }

  loadData = () => {
    this.setState({ loading: true });

    rxjs.combineLatest(
      courseService.list({ page: 1, size: 10 }),
      accessGroupService.list(),
    ).pipe(
      rxjsOperators.cache('access-group-form-data'),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(([courses, accessGroups]) => {
      this.setState({
        courses: courses.map(c => ({ value: c.id, label: c.title })),
        accessGroups: accessGroups.map(c => ({ value: c.id, label: c.name })),
        loading: false
      });
    }, error => {
      this.setState({ loading: false, error });
    });
  }

  onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { model } = this.state;
    const { onComplete } = this.props;

    if (!this.isFormValid()) return;

    this.setState({ loading: true });

    userService.save(model as IUser).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      Snackbar.show('Usuário salvo');
      this.setState({ loading: false });

      onComplete();
    }, err => {
      Snackbar.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading, courses, error, accessGroups } = this.state;
    const { opened, classes, onCancel } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onEnter={this.loadData}
        onExited={this.resetForm}
        disableEnforceFocus
        TransitionComponent={Transition}>

        {loading && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit} noValidate>
          <ValidationContext ref={this.bindValidationContext}>
            <DialogTitle>Novo Usuário</DialogTitle>
            <DialogContent className={classes.content}>
              {error &&
                <ErrorMessage error={error} tryAgain={this.loadData} />
              }

              {!error &&
                <Fragment>
                  <FieldText
                    label='Nome'
                    disabled={loading}
                    value={model.name}
                    validation='required|min:3'
                    onChange={this.updateModel((model, v) => model.name = v)}
                    margin='none'
                  />

                  <FieldText
                    label='Email'
                    type='email'
                    disabled={loading}
                    value={model.email}
                    validation='required|email'
                    onChange={this.updateModel((model, v) => model.email = v)}
                  />

                  <FieldSelect
                    label='Grupo'
                    options={accessGroups}
                    disabled={loading}
                    value={model.group}
                    validation='required'
                    onChange={this.updateModel((model, v) => model.group = v)}
                  />

                  <FieldAutocomplete
                    label='Curso'
                    options={courses}
                    disabled={loading}
                    value={model.course}
                    validation='required'
                    onChange={this.updateModel((model, v) => model.course = v)}
                  />
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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Slide } from '@material-ui/core';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import ErrorMessage from 'components/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { IUser } from 'interfaces/user';
import { FieldAutocomplete, FieldSelect, FieldText, ValidationContext } from 'material-ui-form-fields';
import React, { Fragment } from 'react';
import rxjsOperators from 'rxjs-operators';
import courseService from 'services/course';
import userService from 'services/user';

interface IState extends IStateForm<IUser> {
  loading: boolean;
  courses: { value: number; label: string; }[];
  accessGroups: { value: number; label: string; }[];

  errors: {
    loading?: null;
    save?: null;
  };
}

interface IProps {
  opened: boolean;
  onCancel: Function;
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
      accessGroups: [],
      errors: {}
    };
  }

  loadData() {
    courseService.list().pipe(
      rxjsOperators.logError()
    ).subscribe(courses => {
      this.setState({
        courses: courses.map(c => ({ value: c.id, label: c.title }))
      });
    });
  }

  onCancel() {
    this.props.onCancel();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const { model } = this.state;

    const isValid = this.isFormValid();
    if (!isValid) return;

    userService.save(model as IUser);
  }

  resetState() {
    this.resetForm();
  }

  render() {
    const { model, loading, courses, errors, accessGroups } = this.state;
    const { opened, classes } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onExited={this.resetState.bind(this)}
        TransitionComponent={Transition}>

        {loading && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <ValidationContext ref={this.bindValidationContext.bind(this)}>
            <DialogTitle>Novo Usuário</DialogTitle>
            <DialogContent className={classes.content}>
              {errors.loading &&
                <ErrorMessage error={errors.loading} tryAgain={this.loadData.bind(this)} />
              }

              {!errors.loading &&
                <Fragment>
                  <FieldText
                    label='Email'
                    type='email'
                    disabled={loading}
                    value={model.email}
                    validation='required|email'
                    onChange={this.updateModel((model, v) => model.email = v)}
                    margin='none'
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
              <Button onClick={this.onCancel.bind(this)}>
                Cancelar
            </Button>
              <Button color='secondary' type='submit' disabled={loading || !!errors.loading}>
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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Slide } from '@material-ui/core';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import ErrorMessage from 'components/ErrorMessage';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { IUser } from 'interfaces/user';
import { FieldText, ValidationContext } from 'material-ui-form-fields';
import React, { FormEvent, Fragment } from 'react';
import rxjsOperators from 'rxjs-operators';
import userService from 'services/user';

interface IState extends IStateForm<IUser> {
  loading: boolean;
  roles: { value: number; label: string; }[];
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
      loading: true
    };
  }

  loadData = () => {
    this.setState({ loading: true });

    // rxjs.combineLatest(
    //   courseService.list(),
    //   accessGroupService.list(),
    // ).pipe(
    //   rxjsOperators.cache('access-group-form-data'),
    //   rxjsOperators.logError(),
    //   rxjsOperators.bindComponent(this)
    // ).subscribe(([courses, accessGroups]) => {
    //   this.setState({
    //     courses: courses.map(c => ({ value: c.id, label: c.title })),
    //     accessGroups: accessGroups.map(c => ({ value: c.id, label: c.name })),
    //     loading: false
    //   });
    // }, error => {
    //   this.setState({ loading: false, error });
    // });
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
    const { model, loading, error } = this.state;
    const { opened, classes, onCancel } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onEnter={this.loadData}
        onExited={this.resetForm}
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
                    label='Email'
                    type='email'
                    disabled={loading}
                    value={model.email}
                    validation='required|email'
                    onChange={this.updateModel((model, v) => model.email = v)}
                    margin='none'
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
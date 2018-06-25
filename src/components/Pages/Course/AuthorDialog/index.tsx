import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Slide } from '@material-ui/core';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { IAuthor } from 'interfaces/author';
import { FieldText, ValidationContext } from 'material-ui-form-fields';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import authorService from 'services/author';

interface IState extends IStateForm<IAuthor> {
  loading: boolean;
}

interface IProps {
  opened: boolean;
  onComplete: () => void;
  onCancel: () => void;
  classes?: any;
  model?: IAuthor;
}

@WithStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
})
export default class AuthorFormModal extends FormComponent<IProps, IState> {

  onSubmit = (event: Event) => {
    event.preventDefault();

    const { model } = this.state;
    const { onComplete } = this.props;

    if (!this.isFormValid()) return;

    authorService.save(model as IAuthor).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      Snackbar.show('Grupo de acesso salvo');
      this.setState({ loading: false });

      onComplete();
    }, err => {
      Snackbar.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading } = this.state;
    const { opened, classes, onCancel } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onExited={this.resetForm}
        TransitionComponent={Transition}>

        {loading && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <ValidationContext ref={this.bindValidationContext.bind(this)}>
            <DialogTitle>Novo Autor</DialogTitle>
            <DialogContent className={classes.content}>

              <FieldText
                label='Nome'
                disabled={loading}
                value={model.name}
                validation='required'
                onChange={this.updateModel((model, v) => model.name = v)}
              />

              <FieldText
                label='Description'
                disabled={loading}
                value={model.description}
                multiline
                rows={4}
                validation='required'
                onChange={this.updateModel((model, v) => model.description = v)}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={onCancel}>
                Cancelar
            </Button>
              <Button color='secondary' type='submit' disabled={loading}>
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
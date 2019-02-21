import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { WithStyles } from 'decorators/withStyles';
import * as React from 'react';

/* import Toast from 'components/Shared/Toast'; */
/* import RxOp from 'rxjs-operators';
import authorService from 'services/author'; */

interface IState extends IStateForm {
  isSaving: boolean;
  openedAvatar: boolean;
}

interface IProps {
  classes?: any;
  opened: boolean;
  onComplete: () => void;
  onCancel: () => void;
}

@WithStyles(theme => ({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  },
}))
export default class ExtendAccessDialog extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, isSaving: false };
  }

  handleExit = () => {
    this.resetForm();
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onSubmit = async (isValid: boolean) => {
    if (!isValid) return;

    this.setState({ isSaving: true });

    /* authorService.save(this.state.model).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(author => {
      this.setState({ isSaving: false });

      Toast.show('Salvo com sucesso');
      this.props.onComplete(author);
    }, err => {
      Toast.error(err);
      this.setState({ isSaving: false });
    }); */
  }

  render() {
    const { isSaving, model } = this.state;
    const { classes, opened } = this.props;

    return (
      <Dialog
        open={opened || false}
        disableBackdropClick
        disableEscapeKeyDown
        onExited={this.handleExit}
        TransitionComponent={Transition}
      >
        {isSaving && <LinearProgress color='secondary' />}

        <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>
          <DialogTitle>Extender acesso ao curso</DialogTitle>

          <DialogContent className={classes.content}>
            <Grid container spacing={16} alignItems='center' className={classes.avatarContainer}>
              <Grid item xs={true}>
                <FieldText
                  type='text'
                  label='Extender até:'
                  tabIndex={1}
                  validation='required'
                  disabled={isSaving}
                  value={model.date}
                  onChange={this.updateModel((m, v) => m.date = v)}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button disabled={isSaving} onClick={this.onCancel}>Cancelar</Button>
            <Button color='secondary' type='submit' disabled={isSaving}>Extender</Button>
          </DialogActions>

        </FormValidation>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
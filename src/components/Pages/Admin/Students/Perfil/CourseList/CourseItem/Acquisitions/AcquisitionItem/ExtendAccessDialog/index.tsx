import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import FieldDate from '@react-form-fields/material-ui/components/Date';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toast from 'components/Shared/Toast';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import * as React from 'react';
import RxOp from 'rxjs-operators';
import courseService from 'services/course';

interface IState extends IStateForm {
  isSaving: boolean;
  openedAvatar: boolean;
}

interface IProps extends IStyledProps {
  opened: boolean;
  courseId: number;
  matriculationId: number;
  studentId: number;
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
  today = new Date();

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
    const { model } = this.state;
    const { courseId, matriculationId, studentId } = this.props;

    if (!isValid) return;

    this.setState({ isSaving: true });

    let data = {
      expire_at: model.limitDate,
      course_id: courseId,
      matriculation_id: matriculationId,
    };

    courseService.extendAccess(studentId, data).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(() => {
      this.setState({ isSaving: false });

      Toast.show('Acesso estendido com sucesso!');
      this.props.onComplete();
    }, err => {
      Toast.error(err);
      this.setState({ isSaving: false });
    });
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
          <DialogTitle>Estender acesso</DialogTitle>

          <DialogContent className={classes.content}>
            <Grid container spacing={16} alignItems='center' className={classes.avatarContainer}>
              <Grid item xs={true}>
                <FieldDate
                  label='Liberar acesso até'
                  validation='date'
                  placeholder='Data limite'
                  minDate={this.today}
                  value={model.limitDate}
                  onChange={this.updateModel((model, value) => model.limitDate = value)}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button disabled={isSaving} onClick={this.onCancel}>Cancelar</Button>
            <Button color='secondary' type='submit' disabled={isSaving}>Estender</Button>
          </DialogActions>

        </FormValidation>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
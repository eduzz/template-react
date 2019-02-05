import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { WithStyles } from 'decorators/withStyles';
import * as React from 'react';

import { PLACEHOLDERS } from '../Editor/config';

interface IState extends IStateForm<{
  [key: string]: string;
}> { }

interface IProps {
  opened: boolean;
  onComplete: (value: { [key: string]: string; }) => void;
  onCancel: () => void;
  classes?: any;
}

@WithStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
})
export default class CertificatePreviewDialog extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state };
  }

  onSubmit = async (isValid: boolean) => {
    if (!isValid) return;
    this.props.onComplete(this.state.model);
  }

  onCancel = () => {
    this.props.onCancel();
  }

  render() {
    const { model } = this.state;
    const { classes, opened } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={opened}
        TransitionComponent={Transition}
      >
        <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>
          <DialogTitle>Visualizar</DialogTitle>

          <DialogContent className={classes.content}>
            <Typography>
              Forneça as informações para visualizar um certificado de exemplo.
              É necessário salvar para conferir as alterações realizadas. Uma vez efetuado esse procedimento,
              um link temporário para visualização ficará disponível por 15 minutos.
              </Typography>

            {PLACEHOLDERS.map(placeholder =>
              <FieldText
                key={placeholder}
                label={placeholder}
                value={model[placeholder]}
                onChange={this.updateModel((model, v) => model[placeholder] = v)}
              />
            )}

          </DialogContent>

          <DialogActions>
            <Button onClick={this.onCancel}>Cancelar</Button>
            <Button color='secondary' type='submit'>Salvar e Abrir</Button>
          </DialogActions>

        </FormValidation>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slide from '@material-ui/core/Slide';
import { FormValidation } from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { WithStyles } from 'decorators/withStyles';
import * as React from 'react';

import { PLACEHOLDERS } from '../../config';

interface IState extends IStateForm<{
  text: string;
}> { }

interface IProps {
  opened: boolean;
  value: string;
  onChange: (value: { text: string }) => void;
  classes?: any;
}

@WithStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
})
export default class TextDialog extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state };
  }

  handleEnter = () => {
    this.setState({
      model: {
        text: (this.props.value || '').replace(/\<br \/\>/gim, '\n')
      }
    });
  }

  onCancel = () => {
    this.props.onChange({ text: this.props.value });
  }

  onSubmit = async (isValid: boolean) => {
    if (!isValid) return;

    this.props.onChange({
      text: this.state.model.text.replace(/(?:\r\n|\r|\n)/gim, '<br />')
    });
  }

  handleAddMask = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ model: { text: this.state.model.text + e.target.value } });
  }

  render() {
    const { model } = this.state;
    const { classes, opened } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={opened}
        onEnter={this.handleEnter}
        onExited={this.resetForm}
        TransitionComponent={Transition}
      >
        <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>
          <DialogTitle>Editar Texto</DialogTitle>

          <DialogContent className={classes.content}>
            <FormControl className={classes.root}>
              <Select value='' onChange={this.handleAddMask} displayEmpty>
                <MenuItem value='' disabled>Máscaras</MenuItem>
                {PLACEHOLDERS.map(placeholder =>
                  <MenuItem key={placeholder} value={`[${placeholder}]`}>{placeholder}</MenuItem>
                )}
              </Select>
            </FormControl>

            <FieldText
              label='Texto'
              type='password'
              value={model.text}
              validation='required'
              multiline
              onChange={this.updateModel((model, v) => model.text = v)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.onCancel}>Cancelar</Button>
            <Button color='secondary' type='submit'>Salvar</Button>
          </DialogActions>

        </FormValidation>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@react-form-fields/material-ui/components/Switch';
import { IForm } from '../../../..';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles({
  root: {
    width: 300,
    display: 'flex',
    flexDirection: 'column',
  },
  optionDescription: {
    marginLeft: 48,
  },
  switch: {
    margin: 0,
  },
  switchLabel: {
    marginLeft: -16,
  },
})
export default class TermsOption extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <div className={classes.root}>
        <FormControlLabel
          classes={{
            root: classes.switch,
            label: classes.switchLabel,
          }}
          control={
            <Switch
              value={1}
              onChange={form.updateModel((model, v) => model.accessType = v)}
              checked={form.model.accessType === 1}
            />
          }
          label='Termos e Condições'
        />
        <label className={classes.optionDescription}>
          Solicitar que os alunos aceitem os termos e condições antes de acessar o curso.
        </label>
      </div>
    );
  }
}
import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@react-form-fields/material-ui/components/Switch';
import { IForm } from '../../..';
import { FieldText } from '@react-form-fields/material-ui';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  option: {
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
export default class Terms extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <div className={classes.root}>
        <label className={classes.title}>
          Termos de Uso
        </label>
        <FieldText
          value={form.model.terms_content}
          name='termsInput'
          placeholder='130 Caracteres'
          onChange={form.updateModel((model, v) => model.terms_content = v)}
          variant='outlined'
          validation={form.model.hasterms ? 'required' : ''}
          fullWidth
          multiline
          rows={4}
          inputProps={{
            maxLength: 130,
          }}
        />
        <div className={classes.option}>
          <FormControlLabel
            classes={{
              root: classes.switch,
              label: classes.switchLabel,
            }}
            control={
              <Switch
                onChange={form.updateModel((model, v) => model.hasterms = !model.hasterms)}
                checked={form.model.hasterms}
              />
            }
            label='Exibir Termos e Condições'
          />
          {/* <label className={classes.optionDescription}>
            Solicitar que os alunos aceitem os termos e condições antes de acessar o curso.
          </label> */}
        </div>
      </div>
    );
  }
}
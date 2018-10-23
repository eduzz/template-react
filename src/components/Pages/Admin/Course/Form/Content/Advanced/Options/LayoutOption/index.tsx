import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@react-form-fields/material-ui/components/Switch';
import Radio from '@react-form-fields/material-ui/components/Radio';
import { IForm } from '../../../..';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles({
  root: {
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
  },
  optionDescription: {
    marginLeft: 48,
  },
  switchContainer: {
    width: 300,
    display: 'flex',
    flexDirection: 'column',
  },
  switch: {
    margin: 0,
  },
  switchLabel: {
    marginLeft: -16,
  },
  radioContainer: {
    marginLeft: 47,
  },
  radio: {
    margin: 0,
    marginRight: 16,
  },
  radioLabel: {
    marginLeft: -16,
  },
})
export default class LayoutOption extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.switchContainer}>
          <FormControlLabel
            classes={{
              root: classes.switch,
              label: classes.switchLabel,
            }}
            control={
              <Switch
                onChange={form.updateModel((model, v) => model.new_layout = !model.new_layout)}
                checked={form.model.new_layout}
              />
            }
            label='Novo Layout'
          />
          <label className={classes.optionDescription}>
            Permite que os alunos possam visualizar o novo layout.
          </label>
        </div>
        <div className={classes.radioContainer}>
          <FormControlLabel
            classes={{
              root: classes.radio,
              label: classes.radioLabel,
            }}
            disabled={!form.model.new_layout}
            control={
              <Radio
                value={1}
                onChange={form.updateModel((model, v) => model.theme = v)}
                checked={form.model.theme === 1}
              />
            }
            label='White'
          />
          <FormControlLabel
            classes={{
              root: classes.radio,
              label: classes.radioLabel,
            }}
            disabled={!form.model.new_layout}
            control={
              <Radio
                value={2}
                onChange={form.updateModel((model, v) => model.theme = v)}
                checked={form.model.theme === 2}
              />
            }
            label='Dark'
          />
        </div>
      </div>
    );
  }
}
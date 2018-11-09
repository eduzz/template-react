import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@react-form-fields/material-ui/components/Switch';
import { IForm } from '../../';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles({
  root: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
  },
  optionDescription: {
    marginLeft: 48,
    fontSize: 12,
  },
  switch: {
    margin: 0,
  },
  switchLabel: {
    marginLeft: -16,
  },
})
export default class HiddenLesson extends React.PureComponent<IProps> {
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
              onChange={form.updateModel((model, v) => model.is_draft = !model.is_draft)}
              checked={form.model.is_draft}
            />
          }
          label='Aula Oculta'
        />
        <label className={classes.optionDescription}>
          Impede a exibição da Aula.
        </label>
      </div>
    );
  }
}
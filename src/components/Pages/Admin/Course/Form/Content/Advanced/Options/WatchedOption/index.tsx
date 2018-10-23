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
export default class WatchedOption extends React.PureComponent<IProps> {
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
              value={3}
              onChange={form.updateModel((model, v) => model.allow_manual_watch = !model.allow_manual_watch)}
              checked={form.model.allow_manual_watch}
            />
          }
          label='Marcar como assistida'
        />
        <label className={classes.optionDescription}>
          Permite que os alunos marquem as aulas como assistidas sem precisar concluir o video.
        </label>
      </div>
    );
  }
}
import FieldText from '@react-form-fields/material-ui/components/Text';
import { WithStyles } from 'decorators/withStyles';
import React from 'react';

import { IForm } from '../../../..';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles(theme => ({
  root: {
    width: 300,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  textField: {
    width: 100,
    marginTop: 8,
    marginBottom: 8,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  }
}))
export default class DurationOption extends React.PureComponent<IProps> {
  formatDuration = (duration: number) => {
    return `${Math.trunc(duration / 60)}:${duration % 60}`;
  }

  parseDuration = (duration: string) => {
    const [hours, minutes] = duration.split(':');

    if (!minutes)
      return parseInt(hours);

    return (parseInt(hours) / 60) + parseInt(minutes);
  }

  render() {
    const { classes, form } = this.props;

    const formatedDuration = form.model.duration && this.formatDuration(form.model.duration);

    return (
      <div className={classes.root}>
        <label className={classes.title}>
          Duração do Curso
        </label>
        <div className={classes.content}>
          <FieldText
            type='text'
            value={formatedDuration}
            placeholder='Ex: 120:30'
            className={classes.textField}
            onChange={form.updateModel((model, v) => model.duration = this.parseDuration(v))}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <label>
            H:M
          </label>
        </div>
        <label className={classes.description}>
          Este campo será exibido no certificado do aluno
        </label>
      </div>
    );
  }
}
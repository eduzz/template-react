import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import { IForm } from '../../../..';
import { FieldText } from '@react-form-fields/material-ui';

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
  render() {
    const { classes, form } = this.props;

    return (
      <div className={classes.root}>
        <label className={classes.title}>
          Duração do Curso
        </label>
        <div className={classes.content}>
          <FieldText
            type='text'
            value={form.model.duration}
            placeholder='Ex: 120:30'
            className={classes.textField}
            onChange={form.updateModel((model, v) => model.duration = v)}
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
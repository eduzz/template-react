import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import { IForm } from '../../';
import { FieldText } from '@react-form-fields/material-ui';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles(theme => ({
  root: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
  },
  textField: {
    width: 80,
    marginTop: 8,
    marginBottom: 8,
    marginRight: 8,
  },
  description: {
    fontSize: 12,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  }
}))
export default class LessonScheduling extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <div className={classes.root}>
        <label className={classes.title}>
          Agendamento de Aula
        </label>
        <div className={classes.content}>
          <FieldText
            type='number'
            value={form.model.days_locked}
            className={classes.textField}
            onChange={form.updateModel((model, v) => model.days_locked = parseInt(v))}
            placeholder='Ex. 30'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <label>
            Dias
          </label>
        </div>
        <label className={classes.description}>
          Informe quantos dias após o primeiro acesso do aluno ao curso esta aula será exibida.
        </label>
      </div>
    );
  }
}
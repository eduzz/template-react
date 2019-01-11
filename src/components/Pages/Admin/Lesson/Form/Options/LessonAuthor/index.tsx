import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import { IForm } from '../../';
import FieldText from '@react-form-fields/material-ui/components/Text';

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
export default class ModuleScheduling extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <div className={classes.root}>
        <label className={classes.title}>
          Agendamento de Módulos
        </label>
        <div className={classes.content}>
          <FieldText
            type='number'
            value={form.model.author.id}
            className={classes.textField}
            onChange={form.updateModel((model, v) => model.author = { id: parseInt(v) })}
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
          Informe quantos dias após o primeiro acesso do aluno ao curso este módulo será exibido.
        </label>
      </div>
    );
  }
}
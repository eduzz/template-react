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
    width: 80,
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
export default class DaysAvailableOption extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <div className={classes.root}>
        <label className={classes.title}>
          Validade do Curso
        </label>
        <div className={classes.content}>
          <FieldText
            type='number'
            value={form.model.days_available}
            className={classes.textField}
            onChange={form.updateModel((model, v) => model.days_available = parseInt(v))}
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
          Selecione por quantos dias o curso estará disponível <strong>após o lançamento.</strong>
        </label>
      </div>
    );
  }
}
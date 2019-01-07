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
export default class CertificateOption extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <div className={classes.root}>
        <label className={classes.title}>
          Emissão do certificado
        </label>
        <div className={classes.content}>
          <FieldText
            type='number'
            value={form.model.certificate_progress}
            className={classes.textField}
            onChange={form.updateModel((model, v) => model.certificate_progress = parseInt(v))}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: 101,
              min: 0,
            }}
          />
          <label>
            %
          </label>
        </div>
        <label className={classes.description}>
          Porcentagem que o aluno tem que atingir de aulas assistidas para obter o certificado. Coloque 101% para que o certificado seja desativado.
        </label>
      </div>
    );
  }
}
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
    width: 170,
    marginTop: 8,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
  },
}))
export default class ReleaseAtOption extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    console.log(form.model.release_at);

    return (
      <div className={classes.root}>
        <label className={classes.title}>
          Data de liberação
        </label>
        <FieldText
          id='date'
          type='date'
          value={form.model.release_at}
          className={classes.textField}
          onChange={form.updateModel((model, v) => model.release_at = v)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <label className={classes.description}>
          Selecione a data a partir da qual o curso estará <strong>disponível.</strong>
        </label>
      </div>
    );
  }
}
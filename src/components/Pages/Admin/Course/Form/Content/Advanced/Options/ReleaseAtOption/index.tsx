import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import TextField from '@material-ui/core/TextField';
import { IForm } from '../../../..';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles(theme => ({
  root: {
    width: 200,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  textField: {
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
        <TextField
          id='date'
          type='date'
          defaultValue={form.model.release_at}
          className={classes.textField}
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
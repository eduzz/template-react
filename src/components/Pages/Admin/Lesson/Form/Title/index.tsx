import React, { PureComponent, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { FieldText } from '@react-form-fields/material-ui';
import { IForm } from '..';

interface IProps {
  form: IForm;
}

export default class Title extends PureComponent<IProps> {
  render() {
    const { form } = this.props;

    return (
      <Fragment>
        <Typography variant='subtitle1' color='inherit' noWrap>Título</Typography>
        <FieldText
          value={form.model.title}
          name='title'
          validation='required'
          onChange={form.updateModel((model, v) => model.title = v)}
          margin='dense'
          placeholder='Título da Aula'
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Fragment>
    );
  }
}
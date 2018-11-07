import React, { PureComponent, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { FieldText } from '@react-form-fields/material-ui';
import { IForm } from '../..';

interface IProps {
  form: IForm;
}
export default class Embed extends PureComponent<IProps> {
  render() {
    const { form } = this.props;

    return (
      <Fragment>
        <Typography variant='subtitle2' color='inherit' noWrap>Embed</Typography>
        <FieldText
          value={form.model.content}
          name='content'
          onChange={form.updateModel((model, v) => model.content = v)}
          variant='outlined'
          validation='required'
          helperText='Cole o código gerado pelo parceiro'
          fullWidth
          multiline
          rows={3}
          FormHelperTextProps={{
            style: {
              marginLeft: 0,
            },
          }}
        />
      </Fragment>
    );
  }
}
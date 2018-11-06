import React, { PureComponent, Fragment } from 'react';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { IForm } from '../..';

interface IProps {
  form: IForm;
}

export default class YoutubeVimeo extends PureComponent<IProps> {
  render() {
    const { form } = this.props;

    return (
      <Fragment>
        <FieldText
          value={form.model.title}
          name='title'
          validation='required'
          onChange={form.updateModel((model, v) => model.title = v)}
          margin='dense'
          label='Título'
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
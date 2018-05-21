import { MenuItem, TextField } from '@material-ui/core';
import React from 'react';

import FieldBase, { IPropsFieldBase } from './Base';

interface IProps extends IPropsFieldBase {
  options: { value: any, label: string }[];
}

export default class FieldSelect extends FieldBase<IProps> {
  onChange(event: any) {
    const value = event.target ? event.target.value : event;
    super.onChange(value);
  }

  render() {
    const { touched, error } = this.state;
    const { submitted, value, options } = this.props;

    return (
      <TextField
        {...{
          fullWidth: true,
          margin: 'normal',
          ...this.props,
          value: value === undefined ? '' : value,
          select: true,
          error: (submitted || touched) && !!error,
          helperText: (submitted || touched) && error,
          onChange: this.onChange.bind(this),
          submitted: null,
          touched: null
        }}
      >
        <MenuItem value={undefined}>
          Selecione...
        </MenuItem>
        {(options || []).map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}
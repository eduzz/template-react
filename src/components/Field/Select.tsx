import { MenuItem, TextField } from '@material-ui/core';
import React, { PureComponent } from 'react';

// @ts-ignore
interface IProps extends TextFieldProps {
  error?: string;
  submitted?: boolean;
  value?: any;
  mask?: string;
  touched: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default class FieldSelect extends PureComponent<IProps> {
  onChange(event: any) {
    const value = event.target ? event.target.value : event;
    this.props.onChange(value === 'null' ? null : value);
  }

  render() {
    const { error, submitted, touched, value } = this.props;

    return (
      <TextField
        {...{
          fullWidth: true,
          margin: 'normal',
          ...this.props,
          value: value || 'null',
          select: true,
          error: (submitted || touched) && !!error,
          helperText: (submitted || touched) && error,
          onChange: this.onChange.bind(this),
          submitted: null,
          touched: null
        }}
      >
        <MenuItem value='null'>
          Selecione...
        </MenuItem>
        {[{ value: 1, label: 'Teste' }].map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}
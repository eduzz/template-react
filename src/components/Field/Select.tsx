import { MenuItem, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import React, { PureComponent } from 'react';

interface IState {
  touched: boolean;
}

// @ts-ignore
interface IProps extends TextFieldProps {
  error?: string;
  submitted?: boolean;
  value?: any;
  options: { value: any, label: string }[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default class FieldSelect extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { touched: false };
  }

  onChange(event: any) {
    this.setState({ touched: true });

    const value = event.target ? event.target.value : event;
    this.props.onChange(value === 'null' ? null : value);
  }

  render() {
    const { touched } = this.state;
    const { error, submitted, value, options } = this.props;

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
        {(options || []).map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}
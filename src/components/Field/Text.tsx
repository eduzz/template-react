import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import React, { PureComponent } from 'react';

interface IState {
  touched: boolean;
}

// @ts-ignore
interface IProps extends TextFieldProps {
  value?: any;
  error?: string;
  submitted?: boolean;
  mask?: 'phone';
}

export default class FieldText extends PureComponent<IProps, IState> {
  private readonly masks: any = {
    phone: {
      apply: (value: string) => {
        if (!value) return value;

        const regexp = value.length > 10 ?
          /^(\d{0,2})(\d{0,5})(\d{0,4}).*/ :
          /^(\d{0,2})(\d{0,4})(\d{0,4}).*/;

        const result = value.length > 2 ?
          '($1) $2-$3' : '($1$2$3';

        return value.replace(regexp, result).replace(/-$/, '');
      },
      clean: (value: string) => value.replace(/\D/gi, '').substr(0, 11)
    },
  };

  constructor(props: any) {
    super(props);
    this.state = { touched: false };
  }

  onChange(event: any) {
    this.setState({ touched: true });
    const value = this.cleanValue(event.target ? event.target.value : event);
    this.props.onChange(value);
  }

  getValue(): string {
    const { value, mask } = this.props;

    const maskFunc = this.masks[mask];
    return !maskFunc ? value : maskFunc.apply(value);
  }

  cleanValue(value: string) {
    const { mask } = this.props;

    const maskFunc = this.masks[mask];
    return !maskFunc ? value : maskFunc.clean(value);
  }

  render() {
    const { touched } = this.state;
    const { error, submitted } = this.props;
    const value = this.getValue();

    return (
      <TextField
        {...{
          fullWidth: true,
          margin: 'normal',
          ...this.props,
          value: (value === undefined || value === null ? '' : value).toString(),
          error: (submitted || touched) && !!error,
          helperText: (submitted || touched) && error,
          onChange: this.onChange.bind(this),
          submitted: null,
          touched: null
        }}
      />
    );
  }
}
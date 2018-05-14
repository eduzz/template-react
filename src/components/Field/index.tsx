import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { PureComponent } from 'react';

//@ts-ignore
interface IProps extends TextFieldProps {
  value?: any;
  error?: string;
  submitted?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'date';
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
  mask?: 'phone';
}

interface IState {
  touched: boolean;
}

export default class Field extends PureComponent<IProps, IState> {
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

  render() {
    const { type } = this.props;

    if (type === 'date') {
      return this.renderDate();
    }

    return this.renderText();
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

  renderText() {
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
          submitted: null
        }}
      />
    );
  }

  renderDate() {
    // TODO: update picker
    return null as React.ReactNode;
    // const { touched } = this.state;
    // const { error, value, submitted, label, format } = this.props;

    //return (
    // <DatePicker
    //   value={value || null}
    //   format={format || 'DD/MM/YYYY'}
    //   fullWidth={true}
    //   margin={'normal'}
    //   leftArrowIcon={<ChevronLeftIcon />}
    //   rightArrowIcon={<ChevronRightIcon />}
    //   error={(submitted || touched) && !!error}
    //   helperText={(submitted || touched) && error}
    //   onChange={(date: Moment) => this.onChange(date.toDate())}
    // />
    //);
  }

}
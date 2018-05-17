import { DatePicker } from 'material-ui-pickers';
import { ChevronLeftIcon, ChevronRightIcon } from 'mdi-react';
import { Moment } from 'moment';
import { PureComponent } from 'react';
import React from 'react';

interface IState {
  touched: boolean;
}

interface IProps {
  label: string;
  disabled?: boolean;
  value?: any;
  error?: string;
  submitted?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
  onChange: (value: Date) => void;
}

export default class FieldDate extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { touched: false };
  }

  onChange(value: Moment) {
    this.setState({ touched: true });
    this.props.onChange(value ? value.toDate() : null);
  }

  render() {
    const { touched } = this.state;
    const { error, value, submitted, label, format } = this.props;

    return (
      <DatePicker
        clearable
        clearLabel={'Limpar'}
        okLabel={'OK'}
        cancelLabel={'Cancelar'}
        label={label}
        value={value || null}
        format={format || 'DD/MM/YYYY'}
        fullWidth={true}
        margin={'normal'}
        leftArrowIcon={<ChevronLeftIcon />}
        rightArrowIcon={<ChevronRightIcon />}
        error={(submitted || touched) && !!error}
        helperText={(submitted || touched) && error}
        onChange={this.onChange.bind(this)}
      />
    );
  }
}
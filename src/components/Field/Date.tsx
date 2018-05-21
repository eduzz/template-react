import { DatePicker } from 'material-ui-pickers';
import { ChevronLeftIcon, ChevronRightIcon } from 'mdi-react';
import { Moment } from 'moment';
import React from 'react';

import FieldBase, { IPropsFieldBase } from './Base';

interface IProps extends IPropsFieldBase {
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
  onChange: (value: Date) => void;
}

export default class FieldDate extends FieldBase<IProps> {
  onChange(value: Moment) {
    super.onChange(value ? value.toDate() : null);
  }

  render() {
    const { touched, error } = this.state;
    const { value, submitted, label, format } = this.props;

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
import { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { PureComponent } from 'react';

import FieldDate from './Date';
import FieldSelect from './Select';
import FieldText from './Text';

//@ts-ignore
interface IProps extends TextFieldProps {
  value?: any;
  error?: string;
  submitted?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'select';
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
  constructor(props: any) {
    super(props);
    this.state = { touched: false };
  }

  onChange(event: any) {
    this.setState({ touched: true });
    this.props.onChange((event || {}).target ? event.target.value : event);
  }

  render() {
    const { type } = this.props;

    switch (type) {
      case 'date':
        return this.renderDate();
      case 'select':
        return this.renderSelect();
      default:
        return this.renderText();
    }
  }

  renderText() {
    const { touched } = this.state;

    return (
      <FieldText
        {...this.props}
        touched={touched}
        onChange={this.onChange.bind(this)}
      />
    );
  }

  renderDate() {
    return <FieldDate />;
  }

  renderSelect() {
    const { touched } = this.state;

    return (
      <FieldSelect
        {...this.props}
        touched={touched}
        onChange={this.onChange.bind(this)}
      />
    );
  }

}